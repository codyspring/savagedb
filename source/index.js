const datastore = {}; // This is it.
const mkdirp = require('mkdirp');
const persist = require('./persist');

mkdirp('./data');
let defaultDb = 'default';

const events = require('./events');
const Collection = require('./collection');

function createDatabase(name) {
  datastore[name] = Object.assign(
    { meta: { name }, data: {} },
    Collection()
  );
  events.emit('database-created', name);
  persist.loadData(datastore[name]);
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
