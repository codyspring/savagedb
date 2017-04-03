const store = require('./store');
const Collection = require('./collection');

const create = (name, options) => {
  store[name] = Object.assign(
    {
      name,
      data: {}
    },
    Collection()
  );

  return store[name];
};

module.exports = {
  create,
};
