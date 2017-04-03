const store = require('./store');
const mkdirp = require('mkdirp');

mkdirp('./data');
let defaultDb = 'default';

const Database = require('./database');

Database.create(defaultDb);

const main = (name, options = {}) => {
  if (!name) return store[defaultDb];
  if (store[name]) return store[name];
  return Database.create(name, options);
};

main.setDefault = (name) => {
  if (!store[name]) throw Error('Database must exist to set as default');
  defaultDb = name;
};

module.exports = main;
