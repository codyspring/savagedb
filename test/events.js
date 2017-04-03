const expect = require('chai').expect;
const Rx = require('rx');

const Events = require('../source/events');

describe('::Events', function () {
  it('should return a composable events module', function () {
    const mockDb = Object.assign(
      {},
      Events()
    );

    expect(mockDb).to.have.ownProperty('subject');
    expect(mockDb.subject).to.be.a.function;
  });

  describe('#subject()', function () {
    it('should return an Rx subject', function () {
      const mockDb = Object.assign(
        {},
        Events()
      );

      const test = mockDb.subject('test');
      expect(test).to.be.an.instanceOf(Rx.Subject);
    });
  });
});
