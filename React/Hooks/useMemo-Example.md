### First some fundamentals of JS before using Memo or useMemo()

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

#### Why Memo or useMemo() required at all

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

### Now note the syntax is just the same for all the below 3 Hooks

```js
useCallback(
  doSomething()
}, [dependencies])

useMemo(() => {
  doSomething()
}, [dependencies])

useEffect(() => {
  doSomething()
}, [dependencies])

```

### Some basics on useMemo()

Remember that the function passed to useMemo runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in useEffect, not useMemo.

**useCallback vs useMemo** - The main difference between the two is that ‘useCallback’ returns a memoized callback and ‘useMemo’ returns a memoized value that is the result of the function parameter.

### When to use useMemo()

Sometimes you have to compute a value, either through a complex calculation or by reaching to the database to make a costly query or to the network.

Using this hook, this operation is done only once, then the value will be stored in the memoized value and the next time you want to reference it, you’ll get it much faster.

### General use cases / implementation

```
const memoizedValue = useMemo(() => expensiveOperation())

```

Make sure you add that empty array as a second parameter to useMemo(), otherwise no memoization will happen at all.

If you need to pass arguments, you also need to pass them in the array:

```js
const memoizedValue = useMemo(() => expensiveOperation(param1, param2), [
  param1,
  param2,
])
```

If one of the parameters change when you try to access the value, the value of course will be calculated without memoization.

### useMemo() - Example-1 - Some random expensive function

```js
const List = useMemo(
  () =>
    listOfItems.map(item => ({
      ...item,
      itemProp1: expensiveFunction(props.first),
      itemProp2: anotherPriceyFunction(props.second),
    })),
  [listOfItems],
)
```

In the above example, the useMemo function would run on the first render. It would block the thread until the expensive functions complete, as useMemo runs in the render. Initially, this won’t look as clean as useEffect, since useEffect can render a loading spinner until the expensive functions finish and the effects fire off.

### However, the expensive functions would never fire off again if listOfItems never changed and we would still get the return value from them. It would make these expensive functions seem instantaneous. This is ideal of you have an expensive, synchronous function or two.

### useMemo() - Example-2 - Filtering Large Arrays

```js

import React, { useMemo } from 'react'

const MyList(list, query) {
  // On every component render it will be refiltered
  const filteredList = filterListByQuery(list, query)

  // will re-calculate ONLY when the list or the query has changed
  const memoizedFilterList = React.useMemo(
    () => filterListByQuery(list, query),
    [list, query]
  )
}
```

### useMemo() - Example-3 - Recursive functions, like Fibonacci

```js
const MySequence = number => {
  // Will re-calculate ONLY when 'number' changes
  const memoizedSequence = React.useMemo((() => getFibonacci(number),   [number])
}

```

#### Further Reading

[https://blog.hackages.io/react-hooks-usecallback-and-usememo-8d5bb2b67231](https://blog.hackages.io/react-hooks-usecallback-and-usememo-8d5bb2b67231)
