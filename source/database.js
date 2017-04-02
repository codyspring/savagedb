const store = require('./store');
const events = require('./events');
const persist = require('./persist');
const Collection = require('./collection');

function setPersistence(database, persistence) {
  database.meta.persistence = 'yaml';
  if (persistence === 'json') database.meta.persistence = persistence;
  if (!persistence) database.meta.persistence = false;
}

const create = (name, options = {}) => {
  store[name] = Object.assign(
    {
      meta: { name },
      data: {}
    },
    Collection()
  );

  setPersistence(store[name], options.persistence);
  if (store[name].meta.persistence) {
    persist.loadData(store[name]);
  }

  events.emit('database-created', name);
  return store[name];
};

module.exports = {
  create,
};
