const Rx = require('rx');

module.exports = () => Object.assign({}, {
  ownSubjects: {},
  subject: function subject(name) {
    if (!this.ownSubjects[name]) {
      this.ownSubjects[name] = new Rx.Subject();
    }

    return this.ownSubjects[name];
  },
});
