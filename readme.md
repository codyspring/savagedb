# SavageDB
In-memory datastore.

## Install
Through npm...
```bash
npm install --save savagedb
```

## Usage
```js
const savagedb = require('savagedb');

// Create a database.
const db = savagedb('mydb');

// Create a collection.
const myCollection = db.collection('mycollection');

// Insert a document.
const myDoc = myCollection.insert({ foo: 'bar' });

// Read a document.
const again = myCollection.read(myDoc.id);

// Update a document.
myCollection.update(myDoc.id, { foo: 'baz' });

// Delete a document.
myCollection.delete(myDoc.id);
```

### Database
The module itself is a function to create databases. If nothing is passed to use for a database name it will return the default database (defaults to: default).

#### Change the default db
This is a convenience method so if you're only using one DB all the time it's easier to get going in different places.
```js
const savagedb = require('savagedb');
const db = savagedb('mydb');

// Set it.
db.setDefault('mydb');
const other = savagedb(); // now returns the mydb database.
```

### Collection
Collections are just a dictionary of objects. More on that later.

#### Inserting documents.
Use the insert method and pass it some data. If the JSON object you give it doesn't have an id field, insert generates a random 32 character, alphanumeric string for the id.

#### Reading documents.
Send read an id and it'll return either a document or null. Or, send it nothing and you'll get back the whole collection as an array to iterate / filter over.

#### Updating documents.
Send update the id of the document and an object with changes. New data is added, old data is overwritten and anything that's not supplied in the new object but is in the original is kept.

#### Deleting documents.
Send delete an id, simple as that.

## License
MIT
