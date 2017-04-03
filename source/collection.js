const _ = require('lodash');
const validate = require('aproba');
const Events = require('./events');
const randomstring = require('randomstring').generate;

const Insert = function Insert(data) {
  validate('O', [data]);
  const doc = Object.assign({ id: randomstring() }, data);

  // Make sure the id is unique to the collection.
  while (this.data[doc.id]) {
    doc.id = randomstring();
  }

  this.data[doc.id] = doc;

  this.subject('document-inserted').next(this.data[doc.id]);

  return this.data[doc.id];
};

const Read = function Read(id) {
  validate('Z|S', [id]);
  if (id) return this.data[id] || null;
  return _.values(this.data);
};

const Update = function Update(id, data) {
  validate('SO', [id, data]);
  if (!this.data[id]) return null;
  this.data[id] = Object.assign({}, this.data[id], data);

  this.subject('document-updated').next(this.data[id]);

  return this.data[id];
};

const Delete = function Delete(id) {
  validate('S', [id]);
  delete this.data[id];
  this.subject('document-deleted').next();
};

module.exports = () => Object.assign({}, {
  collection: function collection(name) {
    validate('S', [name]);

    if (!this.collections[name]) {
      this.collections[name] = Object.assign({}, {
        database: this.name,
        name,
        insert: Insert,
        read: Read,
        update: Update,
        delete: Delete,
        data: {},
      }, Events());
    }

    this.collections[name].subject('document-inserted');
    this.collections[name].subject('document-updated');
    this.collections[name].subject('document-deleted');

    this.subject('collection-created').next(name);
    return this.collections[name];
  }
});
