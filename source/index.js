const datastore = {}; // This is it.

let defaultDb = 'default';

function createDatabase(name) {
  datastore[name] = Object.assign(
    { data: {} }
  );
  return datastore[name];
}

createDatabase('default');

const main = (name) => {
  if (!name) return datastore[defaultDb];
  if (datastore[name]) return datastore[name];
  return createDatabase(name);
};

main.setDefault = (name) => {
  defaultDb = name;
};

module.exports = main;
