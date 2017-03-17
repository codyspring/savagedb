const datastore = {}; // This is it.

let defaultDb = 'default';

const Collection = require('./collection');

function createDatabase(name) {
  datastore[name] = Object.assign(
    { data: {} },
    Collection()
  );
  return datastore[name];
}

createDatabase(defaultDb);

const main = (name) => {
  if (!name) return datastore[defaultDb];
  if (datastore[name]) return datastore[name];
  return createDatabase(name);
};

main.setDefault = (name) => {
  if (!datastore[name]) throw Error('Database must exist to set as default');
  defaultDb = name;
};

module.exports = main;
