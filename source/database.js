const events = require('./events');
const persist = require('./persist');
const Collection = require('./collection');

const create = (datastore, name) => {
  datastore[name] = Object.assign(
    {
      meta: { name },
      data: {}
    },
    Collection()
  );
  events.emit('database-created', name);
  persist.loadData(datastore[name]);
  return datastore[name];
};

module.exports = {
  create,
};
