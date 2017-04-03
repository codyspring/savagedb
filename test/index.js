const expect = require('chai').expect;

const SavageDB = require('../source');

describe('SavageDB', function () {
  it('should return a database object', function () {
    const db = SavageDB();
    expect(db).to.be.an.instanceof(Object);
    expect(db).to.have.ownProperty('collections');
    expect(db.collections).to.deep.equal({});
  });

  describe('#setDefault()', function () {
    it('should error if the database being set is not available', function (done) {
      try {
        SavageDB.setDefault('not-available');
        done('no error thrown');
      } catch (error) {
        done();
      }
    });

    it('should set the default database so future unnamed calls return it', function () {
      const db = SavageDB('test'); // eslint-disable-line no-unused-vars
      SavageDB.setDefault('test');
      const testDb = SavageDB();
      expect(testDb).to.have.ownProperty('collections');
    });
  });

  describe('#collection()', function () {
    it('should throw an error when no collection is specified', function (done) {
      const db = SavageDB();
      try {
        const collection = db.collection(); // eslint-disable-line no-unused-vars
        done('no error thrown');
      } catch (error) {
        done();
      }
    });

    it('should return a collection object, creating one if it doesn\'t exist ', function () {
      const db = SavageDB();
      const collection = db.collection('test');
      expect(collection).to.be.an('object');
    });

    it('should send a collection-created event', function (done) {
      const db = SavageDB();

      const created = db.subject('collection-created').subscribe(() => {
        created.unsubscribe();
        done();
      });

      db.collection('foo');
    });
  });
});
