const store = require('./store');
const events = require('./events');
const Collection = require('./collection');

const create = (name, options) => {
  store[name] = Object.assign(
    {
      meta: { name },
      data: {}
    },
    Collection()
  );

  events.emit('database-created', name);
  return store[name];
};

module.exports = {
  create,
};
