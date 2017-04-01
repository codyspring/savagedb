const events = require('./events');
const store = require('./store');
const mkdirp = require('mkdirp');
const fs = require('graceful-fs');
const yaml = require('js-yaml');

// Create useful observables.
events.observe('database-created');
events.observe('collection-created');
events.observe('document-created');
events.observe('document-updated');
events.observe('document-deleted');

// Handle a database being created.
events.subscribe('database-created', (name) => {
  mkdirp(`./data/${name}`);
});

// Handle creating a collection.
events.subscribe('collection-created', (data) => {
  mkdirp(`./data/${data.db}/${data.name}`);
});

// Handle creating a document.
events.subscribe('document-created', (data) => {
  const file = `./data/${data.database}/${data.collection}/${data.document.id}`;
  const fileType = store[data.database].meta.persistence;

  if (fileType === 'json') {
    fs.writeFile(`${file}.${fileType}`, JSON.stringify(data.document));
  } else {
    fs.writeFile(`${file}.${fileType}`, yaml.safeDump(data.document));
  }
});

// Handle updating a document.
events.subscribe('document-updated', (data) => {
  const file = `./data/${data.database}/${data.collection}/${data.document.id}`;
  const fileType = store[data.database].meta.persistence;

  if (fileType === 'json') {
    fs.writeFile(`${file}.${fileType}`, JSON.stringify(data.document));
  } else {
    fs.writeFile(`${file}.${fileType}`, yaml.safeDump(data.document));
  }
});

// Handle deleting a document.
events.subscribe('document-deleted', (data) => {
  const file = `./data/${data.database}/${data.collection}/${data.document.id}`;
  const fileType = store[data.database].meta.persistence;

  fs.unlink(`${file}.${fileType}`);
});

// Syncronously loads data into memory if it exists.
exports.loadData = (db) => {
  // Bail if we don't have a folder for this db.
  try {
    fs.statSync(`./data/${db.meta.name}`);
  } catch (error) {
    return;
  }

  const collections = fs.readdirSync(`./data/${db.meta.name}`);

  for (let i = 0; i < collections.length; i += 1) {
    const collection = db.collection(collections[i], true);
    const documents = fs.readdirSync(`./data/${db.meta.name}/${collections[i]}`);
    const fileType = db.meta.persistence;

    for (let k = 0; k < documents.length; k += 1) {
      const fileName = `./data/${db.meta.name}/${collections[i]}/${documents[k]}`;
      const file = fs.readFileSync(fileName);
      const doc = (fileType === 'json' ? JSON.parse(file) : yaml.safeLoad(file));
      collection.insert(doc, true);
    }
  }
};
