const validate = require('aproba');
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

module.exports = () => Object.assign({}, {
  collection: function collection(name) {
    validate('S', [name]);

    if (!this.data[name]) {
      this.data[name] = Object.assign({}, {
        insert: Insert
      });
    }

    return this.data[name];
  }
});
