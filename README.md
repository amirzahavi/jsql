# jsql
Javascript library with SQL like syntax

---
## Description
This library inspired from the LINQ library from C# language for a code flow like SQL so you can filter, select and query
your data (Array) in a fluent API
---
## Usage
#### where
filters the array by a given filter function and return a new filtered array.

where(predicate)
##### inputs
**predicate:** [function] that returns a boolean
```javascript
let arr = [1, 2, 3, 4, 5, 6];
var res = arr.where((curr) => curr % 2 == 0); //ouput: res = [2,4,6]
```
#### group
groups the array by a given field. if the array is array of primitives than it will group them by thier value
the value of the group will be the count of thier instances.

group(key)
##### inputs
**key [optional]:** [string] the name of the property to group by
```javascript
let arr = [1, 1, 1, 2, 2, 3];
var res = arr.group(); //ouput: res = {1: 3,2: 2,3: 1}
// -- or
let arr = [{id:1, group: 'a'},{id:2, group: 'a'},{id:3, group: 'b'}]
var res = arr.group('group'); 
/*output: res = {
    'a': [
        {id:1, group: 'a'},
        {id:2, group: 'a'} 
    ], 
    'b': [
        {id:3, group: 'b'}
    ]
}
*/
```
#### select
projects the property selected

select(key)
##### inputs
**key [optional]:** [string] the name of the property to select
```javascript
let arr = [{id:1, group: 'a'},{id:2, group: 'a'},{id:3, group: 'b'}]
var res = arr.select('id'); //ouput: res = [1,2,3]
```
#### first
get the first element of the array without mutate it.

first()
```javascript
let arr = [{id:1, group: 'a'},{id:2, group: 'a'},{id:3, group: 'b'}]
var res = arr.first(); //ouput: res = {id:1, group: 'a'}
```
#### any
return true if any of the elements setisfy the condition

any(condition)
##### inputs
**confition:** [function] that returns true or false
```javascript
let arr = [{id:1, group: 'a'},{id:2, group: 'a'},{id:3, group: 'b'}]
var res = arr.any( el => el.group === 'c'  ); //ouput: res = false
```
#### all
return true if all of the elements setisfy the condition

all(condition)
##### inputs
**confition:** [function] that returns true or false
```javascript
let arr = [{id:1, group: 'a'},{id:2, group: 'a'},{id:3, group: 'b'}]
var res = arr.all( el => el.id < 4 ); //ouput: res = true
```
#### orderBy
return a new array of ordered elements by the key in ascending order.

orderBy(key)
##### inputs
**key [optional]:** [function | string] the key or a function to order by the elements
```javascript
let arr = [{id:1, group: 'a'},{id:3, group: 'a'},{id:2, group: 'b'}]
var res = arr.orderBy('id'); //ouput: res = [{id:1, group: 'a'},{id:2, group: 'b'},{id:3, group: 'a'}]
// -- or
let arr = [{id:1, group: 'a'},{id:3, group: 'a'},{id:2, group: 'b'}]
var res = arr.orderBy( (a,b) => a.id - b.id );
//ouput: res = [{id:1, group: 'a'},{id:2, group: 'b'},{id:3, group: 'a'}]
// -- or
let arr = [3,2,1]
var res = arr.orderBy(); // [1,2,3]
```
#### orderByDesc
 the same usage as `orderBy` but order in descending order.
 #### take
 return the selected number of elements from the array as a new array.
 
 take(amount)
 ##### inputs
**amount:** [number] the number of elements to take from the array, negative value will take from last of the array.
```javascript
let arr = [1,2,3,4,5,6];
let res = arr.take(3); //output: res = [1,2,3]
// -- or
let arr = [1,2,3,4,5,6];
let res = arr.take(-3); //output: res = [4,5,6]
```
