const store = require('./store');
const Events = require('./events');
const Collection = require('./collection');

const create = (name, options) => {
  store[name] = Object.assign(
    {
      name,
      collections: {}
    },
    Collection(),
    Events()
  );

  store[name].subject('collection-created');

  return store[name];
};

module.exports = {
  create,
};
