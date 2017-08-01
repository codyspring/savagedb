const expect = require('chai').expect

const Database = require('../source/database')

describe('Database', function () {
  describe('#create()', function () {
    it('should return a database object', function () {
      const db = Database.create({}, 'Database-test')
      expect(db).to.be.an.instanceof(Object)
      expect(db).to.have.ownProperty('collections')
      expect(db.collections).to.deep.equal({})
    })
  })
})
