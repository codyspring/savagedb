const expect = require('chai').expect;

const database = require('../source/index');

describe('database', function () {
  it('should return a database object', function () {
    const db = database();
    expect(db).to.be.an.instanceof(Object);
    expect(db).to.have.ownProperty('data');
    expect(db.data).to.deep.equal({});
  });

  describe('#setDefault()', function () {
    it('should set the default database so future unnamed calls return it', function () {
      database.setDefault('test');
      const newDb = database();
    });
  });

  describe('#collection()', function () {
    it('should throw an error when no collection is specified', function (done) {
      const db = database();
      try {
        const collection = db.collection(); // eslint-disable-line no-unused-vars
        done('no error thrown');
      } catch (error) {
        done();
      }
    });

    it('should return a collection object, creating one if it doesn\'t exist ', function () {
      const db = database();
      const collection = db.collection('test');
      expect(collection).to.be.an('object');
    });
  });
});
