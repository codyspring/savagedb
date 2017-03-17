const events = require('./events');
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
  fs.writeFile(
    `./data/${data.database}/${data.collection}/${data.document.id}.yaml`,
    yaml.safeDump(data.document)
  );
});

// Handle updating a document.
events.subscribe('document-updated', (data) => {
  fs.writeFile(
    `./data/${data.database}/${data.collection}/${data.document.id}.yaml`,
    yaml.safeDump(data.document)
  );
});

// Handle deleting a document.
events.subscribe('document-deleted', (data) => {
  fs.unlink(`./data/${data.database}/${data.collection}/${data.document}.yaml`);
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

    for (let k = 0; k < documents.length; k += 1) {
      const doc = yaml.safeLoad(
        fs.readFileSync(`./data/${db.meta.name}/${collections[i]}/${documents[k]}`)
      );
      collection.insert(doc, true);
    }
  }
};
