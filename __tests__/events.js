const Rx = require('rxjs/Rx')

const Events = require('../source/events')

describe('::Events', function () {
  it('should return a composable events module', function () {
    const mockDb = Object.assign( // eslint-disable-line no-unused-vars
      {},
      Events()
    )
  })

  it('should contain a dictionary of subjects', function () {
    const mockDb = Object.assign(
      {},
      Events()
    )

    expect(mockDb).toHaveProperty('ownSubjects')
    expect(mockDb.ownSubjects).toMatchObject({})
  })

  describe('#subject()', function () {
    it('should return an Rx subject', function () {
      const mockDb = Object.assign(
        {},
        Events()
      )

      const foo = mockDb.subject('foo')
      expect(foo).toBeInstanceOf(Rx.Subject)
    })

    it('should add new Rx subjects to it\'s ownSubjects dictionary', function () {
      const mockDb = Object.assign(
        {},
        Events()
      )

      const foo = mockDb.subject('foo')
      expect(mockDb.ownSubjects.foo).toBe(foo)
    })

    it('should return a current Rx subject if it exists', function () {
      const mockDb = Object.assign(
        {},
        Events()
      )

      const foo = mockDb.subject('foo')
      const bar = mockDb.subject('foo')
      expect(foo).toBe(bar)
    })
  })
})
