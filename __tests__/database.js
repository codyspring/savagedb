const Database = require('../source/database')

describe('Database', function () {
  describe('#create()', function () {
    it('should return a database object', function () {
      const db = Database.create({}, 'Database-test')
      expect(db).toBeInstanceOf(Object)
      expect(db).toHaveProperty('collections')
      expect(db.collections).toMatchObject({})
    })
  })
})
