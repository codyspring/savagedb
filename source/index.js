const store = require('./store');
const Events = require('./events');
const Database = require('./database');

let defaultDb = 'default';

const broker = Object.assign({}, Events());

const main = (name, options = {}) => {
  if (!name) return store[defaultDb];
  if (store[name]) return store[name];
  const database = Database.create(name, options);
  main.subject('database-created').next(database);
  return database;
};

main.setDefault = (name) => {
  if (!store[name]) throw Error('Database must exist to set as default');
  defaultDb = name;
};

main.ownSubjects = broker.ownSubjects;
main.subject = broker.subject;
main.subject('database-created');

Database.create(defaultDb);

module.exports = main;
