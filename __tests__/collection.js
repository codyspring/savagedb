const randomstring = require('randomstring').generate
const database = require('../source')

const mockDb = database(randomstring())
const mockCollection = mockDb.collection('test')

describe('collection', function () {
  describe('#insert()', function () {
    it('should error when no object is supplied', function (done) {
      try {
        mockCollection.insert()
        done('no error thrown')
      } catch (error) {
        done()
      }
    })

    it('should return the object with an id', function () {
      const doc = mockCollection.insert({ id: '123', foo: 'bar' })
      expect(doc).toMatchObject({ id: '123', foo: 'bar' })
    })

    it('should generate an id when none is supplied', function () {
      const doc = mockCollection.insert({ foo: 'bar' })
      expect(doc).toBeInstanceOf(Object)
      expect(doc.id.length).toBe(32)
      expect(doc.foo).toBe('bar')
    })

    it('should store the object in the collection', function () {
      const doc = mockCollection.insert({ foo: 'bar' })
      expect(mockCollection.data[doc.id]).toMatchObject(doc)
    })

    it('should write a new object when trying to save an id that is already in use', function () {
      const doc = mockCollection.insert({ foo: 'bar' })
      const newDoc = mockCollection.insert({ id: doc.id, bar: 'baz' })
      expect(newDoc.id).not.toBe(doc.id)
      expect(newDoc.id.length).toBe(32)
      expect(mockCollection.data[newDoc.id]).toMatchObject(newDoc)
    })

    it('should send a document-inserted event', function (done) {
      const inserted = mockCollection.subject('document-inserted').subscribe(() => {
        inserted.unsubscribe()
        done()
      })

      mockCollection.insert({ foo: 'bar' })
    })
  })

  describe('#read()', function () {
    it('should return all documents when no argument is passed', function () {
      mockCollection.insert({ foo1: 'bar1' })
      mockCollection.insert({ foo2: 'bar2' })
      const docs = mockCollection.read()
      expect(docs).toBeInstanceOf(Array)
      expect(docs.length).toBeGreaterThanOrEqual(2)
    })

    it('should return a single document when an id is passed', function () {
      const doc = mockCollection.insert({ foo: 'bar' })
      const again = mockCollection.read(doc.id)
      expect(again.id).toBe(doc.id)
    })

    it('should return null when an id is passed but not in the collection', function () {
      const doc = mockCollection.read('some-random-id')
      expect(doc).toBe(null)
    })
  })

  describe('#update()', function () {
    it('should error when id and data isn\'t supplied', function (done) {
      try {
        mockCollection.update()
        done('no error thrown')
      } catch (error) {
        done()
      }
    })

    it('should return null when no object was founf to update', function () {
      const doc = mockCollection.update('not-here', { foo: 'baz' })
      expect(doc).toBe(null)
    })

    it('should update an object by id', function () {
      let doc = mockCollection.insert({ foo: 'bar' })
      const id = doc.id
      expect(doc.foo).toBe('bar')

      doc = mockCollection.update(doc.id, { foo: 'baz' })
      expect(doc.id).toBe(id)
      expect(doc.foo).toBe('baz')
    })

    it('should send a document-updated event', function (done) {
      const updated = mockCollection.subject('document-updated').subscribe(() => {
        updated.unsubscribe()
        done()
      })

      const doc = mockCollection.insert({ foo: 'bar' })
      mockCollection.update(doc.id, { bar: 'baz' })
    })
  })

  describe('#delete()', function () {
    it('should error when no id is supplied', function (done) {
      try {
        mockCollection.delete()
        done('no error thrown')
      } catch (error) {
        done()
      }
    })

    it('should delete an object by id', function () {
      const doc = mockCollection.insert({ foo: 'bar' })
      mockCollection.delete(doc.id)
      expect(mockCollection[doc.id]).toBeFalsy()
    })

    it('should send a document-deleted event', function (done) {
      const deleted = mockCollection.subject('document-deleted').subscribe(() => {
        deleted.unsubscribe()
        done()
      })

      const doc = mockCollection.insert({ foo: 'bar' })
      mockCollection.delete(doc.id)
    })
  })
})
