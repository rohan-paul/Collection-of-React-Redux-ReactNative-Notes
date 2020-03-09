You may remember how Javascript compares objects 🥴. There are some tricky results when we run equality comparisons:

```js
{} === {} // false

const z = {}
z === z // true

```

React uses Object.is to compare components, but that gives very similar results to using ===. So, when React checks for any changes in a component, it may find a “change” that we wouldn’t really consider a change.

```js
() => {} === () => {} // false
[] === [] // false

```

This comparison check will cause some React re-rendering we didn’t intend or expect. If that re-rendering is some expensive operation, that can hurt performance. If one part re-renders, it re-render the entire component tree. Thus, React released the memo idea to fix this.

### Object.is() determines whether two values are the same value. Two values are the same if one of the following holds:

```js
both undefined
both null
both true or both false
both strings of the same length with the same characters in the same order
both the same object (means both object have same reference)
both numbers and
both +0
both -0
both NaN
or both non-zero and both not NaN and both have the same value

```

This is not the same as being equal according to the == operator. The == operator applies various coercions to both sides (if they are not the same Type) before testing for equality (resulting in such behavior as "" == false being true), but Object.is doesn't coerce either value.

This is also not the same as being equal according to the === operator. The === operator (and the == operator as well) treats the number values -0 and +0 as equal and treats Number.NaN as not equal to NaN.
