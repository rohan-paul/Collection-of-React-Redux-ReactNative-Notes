In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their mapStateToProps function. This is why Reselect is awesome. It will just return the memoized result if nothing has changed.

Operators like .map and .filter return referentially different values every time they are invoked. Thus, we must make sure that when the actual output is the same, then the reference stays the same and when the actual output is different, then the reference should be different as well. To do that, we employ a technique called memoization. This technique guarantees that “as long as the inputs to a function are the same, then the output will be referentially the same”. One popular library option to implement that is reselect. With it, we could re-write our selector like so:

[3-small-tips-for-better-redux-performance-in-a-react-app](https://itnext.io/3-small-tips-for-better-redux-performance-in-a-react-app-9cde549df6af)

```js
import { createSelector } from "reselect"
export const getItems = createSelector(
  state => state.items,
  items => Object.keys(items),
)
```
