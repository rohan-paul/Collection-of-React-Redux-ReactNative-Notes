### First note the syntax is just the same for all the below 3 Hooks

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

**useCallback vs useMemo** - The main difference between the two is that ‘useCallback’ returns a memoized callback and ‘useMemo’ returns a memoized value that is the result of the function parameter.

#### ‘useCallback’, however, is used differently. Take for example a parent component that often re-renders. Inside the parent, we have a child component that takes a function-prop. At each re-render, the Child will re-execute its function prop uselessly. However, if you pass ‘useCallback’ as a prop with a dependency array, it resolves the issue because the function will be executed only when the dependency changes. Every other re-render will then get a cached function.

Here is a demo - it also has a nice useMemo() implementation:

```js
import React, { useState, useMemo, useCallback } from "react"

const App = () => {
  // We create two states that will keep count of the number of time all hooks are called
  const [callbackCount, setCallbackCount] = useState(0)
  const [memoCount, setMemoCount] = useState(0)

  const memoFunction = () => {
    console.log(memoCount, "memo called")
    // Do something that will take a lot of processing ...
  }

  // Here if we give an empty array of dependencies, the callback function will return the old value of callbackCount
  // because useCallback will return its memoized version
  const callbackFunction = useCallback(() => {
    console.log(callbackCount, "callback called")
    // Do something with callbackCount ...
    return callbackCount
  }, [callbackCount])

  // We create the memo hook, ONLY when memoCount changes, the function will be executed again, and if memoCount does not change then memoFunction will NOT be executed
  useMemo(memoFunction, [memoCount])

  return (
    <>
      {/* This component will receive a function that will change when the dependency value changes */}
      <ChildComponent action={callbackFunction} />

      {/* Change the callback hook dependency to trigger a change in the child */}
      <button onClick={() => setCallbackCount(callbackCount + 1)}>
        Change callback count
      </button>

      {/* After creating useMemo, each change of memoCount will trigger the function passed to the hook,
    otherwise the memoized value will be returned */}
      <button onClick={() => setMemoCount(memoCount + 1)}>
        Change memo count
      </button>
    </>
  )
}

const ChildComponent = ({ action }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let val = action()
    setValue(val)
  }, [action])

  return <>Child : {value}</>
}
```

### you should not use ‘useCallback’ and ‘useMemo’ for everything. ‘useMemo’ should be used for big data processing while ‘useCallback’ is a way to add more dependency to your code to avoid useless rendering.

#### Further Reading

[https://blog.hackages.io/react-hooks-usecallback-and-usememo-8d5bb2b67231](https://blog.hackages.io/react-hooks-usecallback-and-usememo-8d5bb2b67231)
