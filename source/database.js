const store = require('./store');
const events = require('./events');
const persist = require('./persist');
const Collection = require('./collection');
const validate = require('aproba');

// TODO: Validate
function setPersistence(database, persistence) {
  if (!persistence || typeof persistence !== 'object') {
    database.meta.persistence = false;
    return;
  }

  switch (persistence.file) {
    case 'yaml':
      database.meta.persistence = 'yaml';
      break;
    case 'json':
      database.meta.persistence = 'json';
      break;
    default:
      database.meta.persistence = false;
      break;
  }
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
