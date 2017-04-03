const _ = require('lodash');
const validate = require('aproba');
const Events = require('./events');
const randomstring = require('randomstring').generate;

const Insert = function Insert(data) {
  validate('O', [data]);
  const doc = Object.assign({ id: randomstring() }, data);

  // Make sure the id is unique to the collection.
  while (this[doc.id]) {
    doc.id = randomstring();
  }

  this[doc.id] = doc;

  return doc;
};

const Read = function Read(id) {
  validate('Z|S', [id]);
  if (id) return this[id] || null;
  return _.values(this);
};

const Update = function Update(id, data) {
  validate('SO', [id, data]);
  if (!this[id]) return null;
  this[id] = Object.assign({}, this[id], data);

  return this[id];
};

const Delete = function Delete(id) {
  validate('S', [id]);
  delete this[id];
};

module.exports = () => Object.assign({}, {
  collection: function collection(name) {
    validate('S', [name]);

    if (!this.data[name]) {
      this.data[name] = Object.assign({}, {
        meta: { database: this.meta.name, name },
        insert: Insert,
        read: Read,
        update: Update,
        delete: Delete
      });
    }

    return this.data[name];
  }
});
