# isJs
Is Node.Js library to check any variable.
This library include d.ts file for [TypeScript](https://www.typescriptlang.org/).

## Installation

Install with [npm](http://npmjs.org/) (for NodeJS):

```shell
npm install is --save
```

Incompatible for browser

## Usage

TypeScript exemple
```typescript
import is = require('isjs')

var checkString = is.string.length.equal(5)
checkString("abcde") // true
```

JavaScript exemple
```javascript
var is = require('isjs')

var checkString = is.string.length.equal(5)
checkString("abcde") // true
```

## Exemples

Test an array

```javascript
var checkArray = is.array.each(is.number)
checkArray([3, 18, 5]) // true
checkArray(["3", 18, 5]) // false
```

And/Or/Not

```javascript
var checkString = is.string.in.list("Hello", "Allo", "Ola", "Bonjour").and.not.in.array(["Bonjour", "Allo"])
checkString("Hello") // true
checkString("miaou") // false
checkString("Bonjour") // false
```

Test an Object

```javascript
var checkObject = is.object.with.properties({
    a: is.string,
    b: is.number.inf(100).or(is.undefined) // is optional
})
checkObject({ a: "hello", b: 20 }) // true
checkObject({ a: "I love javascript" }) // true
checkObject({ b: 40 }) // false
checkObject({ a: 32, b: 40 }) // false
checkObject({ a: 32, b: 40 }) // false
```

Test Array of Object

```javascript
var checkObject = is.object.with.properties({
    a: is.string,
    b: is.number.inf(100).or(is.undefined) // is optional
})
var checkArray = is.array.each(checkObject)

checkArray([
    { a: "hello" },
    { a: "toto", b: 78 },
    { a: "youhou", b: 18 }
]) // true
```