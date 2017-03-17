const expect = require('chai').expect;
const Collection = require('../source/collection');

const mockDb = Object.assign({}, { name: 'test', data: [] }, Collection());
const mockCollection = mockDb.collection('test');

describe('collection', function () {
  describe('#insert()', function () {
    it('should error when no object is supplied', function (done) {
      try {
        mockCollection.insert();
        done('no error thrown');
      } catch (error) {
        done();
      }
    });

    it('should return the object with an id', function () {
      const doc = mockCollection.insert({ id: '123', foo: 'bar' });
      expect(doc).to.deep.equal({ id: '123', foo: 'bar' });
    });

    it('should generate an id when none is supplied', function () {
      const doc = mockCollection.insert({ foo: 'bar' });
      expect(doc).to.be.an('object');
      expect(doc.id).to.be.a('string');
      expect(doc.id.length).to.equal(32);
      expect(doc.foo).to.equal('bar');
    });

    it('should store the object in the collection', function () {
      const doc = mockCollection.insert({ foo: 'bar' });
      expect(mockCollection[doc.id]).to.deep.equal(doc);
    });

    it('should write a new object when trying to save an id that is already in use', function () {
      const doc = mockCollection.insert({ foo: 'bar' });
      const newDoc = mockCollection.insert({ id: doc.id, bar: 'baz' });
      expect(newDoc.id).to.not.equal(doc.id);
      expect(newDoc.id).to.be.a('string');
      expect(newDoc.id.length).to.equal(32);
      expect(mockCollection[newDoc.id]).to.deep.equal(newDoc);
    });
  });
});
