const datastore = require('./store');
const mkdirp = require('mkdirp');

mkdirp('./data');
let defaultDb = 'default';

const Database = require('./database');

Database.create(datastore, defaultDb);

const main = (name, options = {}) => {
  if (!name) return datastore[defaultDb];
  if (datastore[name]) return datastore[name];
  return Database.create(datastore, name, options);
};

main.setDefault = (name) => {
  if (!datastore[name]) throw Error('Database must exist to set as default');
  defaultDb = name;
};

module.exports = main;
