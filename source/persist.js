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
