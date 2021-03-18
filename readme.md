# Install
#### Using npm:
```text
$ npm install node-fake-database
```
#### Using bower:
```text
$ bower install node-fake-database
```
#### Using yarn:
```text
$ yarn add node-fake-database
```
# Example
```javascript
const Database = require('node-fake-database')

// create new database
let db = new Database("db")
```
**Create new user**
```javascript
;(async function() {
        await db.createUser("Mabrur", 18, ['Uzbek', 'Russian', 'English', 'Korean'])
        // name, age, languages
    }
)()
```
**Filter**
```javascript
;(async function() {
        // filter by id
        let res = await db.filter(1, "id");
        // filter by age
        let res = await db.filter(18, "age");
        // filter by name 
        let res = await db.filter("Mabrur", "name");
        // filter by language
        let res = await db.filter("uzbek", "lang");
    }
)()
```
# Run
```text
$ node main.js
```

