const _ = require('lodash');
const validate = require('aproba');
const events = require('./events');
const randomstring = require('randomstring').generate;

const Insert = function Insert(data, memOnly = false) {
  validate('OB|O', [data, memOnly]);
  const doc = Object.assign({ id: randomstring() }, data);

  // Make sure the id is unique to the collection.
  while (this[doc.id]) {
    doc.id = randomstring();
  }

  this[doc.id] = doc;

  if (!memOnly) {
    events.emit('document-created', {
      database: this.meta.database,
      collection: this.meta.name,
      document: this[doc.id]
    });
  }
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

  events.emit('document-updated', {
    database: this.meta.database,
    collection: this.meta.name,
    document: this[id]
  });
  return this[id];
};

const Delete = function Delete(id) {
  validate('S', [id]);
  delete this[id];
  events.emit('document-deleted', {
    database: this.meta.database,
    collection: this.meta.name,
    document: id
  });
};

module.exports = () => Object.assign({}, {
  collection: function collection(name, memOnly = false) {
    validate('SB|S', [name, memOnly]);

    if (!this.data[name]) {
      this.data[name] = Object.assign({}, {
        meta: { database: this.meta.name, name },
        insert: Insert,
        read: Read,
        update: Update,
        delete: Delete
      });
    }

    if (!memOnly) events.emit('collection-created', { db: this.meta.name, name });
    return this.data[name];
  }
});
