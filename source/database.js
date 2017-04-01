const events = require('./events');
const persist = require('./persist');
const Collection = require('./collection');

function setPersistence(database, persistence) {
  database.meta.persistence = 'yaml';
  if (persistence === 'json') database.meta.persistence = persistence;
}

const create = (datastore, name, options = {}) => {
  datastore[name] = Object.assign(
    {
      meta: { name },
      data: {}
    },
    Collection()
  );

  setPersistence(datastore[name], options.persistence);
  persist.loadData(datastore[name]);

  events.emit('database-created', name);
  return datastore[name];
};

module.exports = {
  create,
};
