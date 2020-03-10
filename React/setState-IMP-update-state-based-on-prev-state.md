**setState is asynchronous**

The fact that setState causes reconciliation(the process of re-rendering the components tree) is base of the next property — setState is asynchronous. This allows us to have multiple calls to setState in a single scope and not trigger not needed re-renders of the whole tree.

**Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.**

**This is why you don’t see the new values in state right after you updated it**

// assuming this.state = { value: 0 }

```js
this.setState({
  value: 1,
})
console.log(this.state.value) // 0
```

React will also try to group or batch setState calls into a single call, which leads us to our first “gotcha”:

// assuming this.state = { value: 0 };

```js
this.setState({ value: this.state.value + 1 })
this.setState({ value: this.state.value + 1 })
this.setState({ value: this.state.value + 1 })
```

After all the above calls are processed this.state.value will be 1, not 3 like we would expect! To get around that …

assuming this.state = { value: 0 };

```js
this.setState(state => ({ value: state.value + 1 }))
this.setState(state => ({ value: state.value + 1 }))
this.setState(state => ({ value: state.value + 1 }))
```

### Will give us this.state.value = 3 like we expected in the first place. Remember to always use this syntax when updating state to a value, which is computed based on previous state!

### Further Reading

[Official Docs](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)

[https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b](https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b)
