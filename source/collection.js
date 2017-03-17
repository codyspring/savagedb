const validate = require('aproba');

module.exports = () => Object.assign({}, {
  collection: function collection(name) {
    validate('S', [name]);

    if (!this.data[name]) {
      this.data[name] = Object.assign({});
    }

    return this.data[name];
  }
});
