# SavageDB
In memory datastore with flat file persistence.

## Install
Through npm...
```bash
npm install @playsavage/savagedb
```

## Usage
```js
const savagedb = require('@playsavage/savagedb');

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
const savagedb = require('@playsavage/savagedb');
const db = savagedb('mydb');

// Set it.
db.setDefault('mydb');
const other = savagedb(); // now returns the mydb database.
```

### Collection
Collections are just a dictionary of objects that gets persisted to disk as yaml files. More on that later.

#### Inserting documents.
Use the insert method and pass it some data. If the JSON object you give it doesn't have an id field, insert generates a random 32 character, alphanumeric string for the id. Note that the id is what's used when persisting documents to disk so, keep that in mind when naming things.

#### Reading documents.
Send read an id and it'll return either a document or null. Or, send it nothing and you'll get back the whole collection as an array to iterate / filter over.

#### Updating documents.
Send update the id of the document and an object with changes. New data is added, old data is overwritten and anything that's not supplied in the new object but is in the original is kept.

#### Deleting documents.
Send delete an id, simple as that.

## NOTES
### Why YAML over JSON?
Because YAML is a subset of JSON and I prefer the trade off in a little but of speed to allow easily reading / editing files by hand later. This is especially useful in a system where document id's aren't randomly generated; like one of our use cases.

That being said, not converting every object back and forth from YAML to JSON would be great for some and it's on the roadmap as an eventual option.

### Performance
I make no guarantees on this front. The file persistence (aside from initially loading a database) is all done asynchronously through events so that shouldn't slow runtime down too much. However, I wouldn't expect anything crazy and there's likely better projects out there if that's a requirement.

## License
MIT
