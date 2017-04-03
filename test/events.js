const expect = require('chai').expect;
const Rx = require('rx');

const Events = require('../source/events');

describe('::Events', function () {
  it('should return a composable events module', function () {
    const mockDb = Object.assign( // eslint-disable-line no-unused-vars
      {},
      Events()
    );
  });

  it('should contain a dictionary of subjects', function () {
    const mockDb = Object.assign(
      {},
      Events()
    );

    expect(mockDb).to.have.ownProperty('ownSubjects');
    expect(mockDb.ownSubjects).to.deep.equal({});
  });

  describe('#subject()', function () {
    it('should return an Rx subject', function () {
      const mockDb = Object.assign(
        {},
        Events()
      );

      const foo = mockDb.subject('foo');
      expect(foo).to.be.an.instanceOf(Rx.Subject);
    });

    it('should add new Rx subjects to it\'s ownSubjects dictionary', function () {
      const mockDb = Object.assign(
        {},
        Events()
      );

      const foo = mockDb.subject('foo');
      expect(mockDb.ownSubjects.foo).to.equal(foo);
    });

    it('should return a current Rx subject if it exists', function () {
      const mockDb = Object.assign(
        {},
        Events()
      );

      const foo = mockDb.subject('foo');
      const bar = mockDb.subject('foo');
      expect(foo).to.equal(bar);
    });
  });
});