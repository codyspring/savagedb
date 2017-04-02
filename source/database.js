const events = require('./events');
const persist = require('./persist');
const Collection = require('./collection');

function setPersistence(database, persistence) {
  database.meta.persistence = 'yaml';
  if (persistence === 'json') database.meta.persistence = persistence;
  if (!persistence) database.meta.persistence = false;
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
  if (datastore[name].meta.persistence) {
    persist.loadData(datastore[name]);
  }

  events.emit('database-created', name);
  return datastore[name];
};

module.exports = {
  create,
};
