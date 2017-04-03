const store = require('./store');
const Collection = require('./collection');

const create = (name, options) => {
  store[name] = Object.assign(
    {
      meta: { name },
      data: {}
    },
    Collection()
  );

  return store[name];
};

module.exports = {
  create,
};
