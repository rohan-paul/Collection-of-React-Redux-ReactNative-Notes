```js
import React from "react"
import fetchMock from "fetch-mock"
import { render, waitForElement, fireEvent } from "react-native-testing-library"
import { NEWSLETTER_ENDPOINT } from "../../../../complex-version/api/config"
import { Home } from "../Home"
import { wording } from "../../../../utils/wording"

// First this is the component we are testing

export const renderPage = (page: ReactElement) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(watchAll)

  return render(
    <Provider store={store}>
      {page}
      <Toaster />
    </Provider>,
  )
}

// And this is the test code
test("should display successful message on successful subscription", async () => {
  fetchMock.post(NEWSLETTER_ENDPOINT, 200)
  const page = renderPage(<Home />)
  const EmailInput = page.getByPlaceholder(wording.emailPlaceholder)
  const ValidateButton = page.getByText(wording.validateEmail)
  fireEvent.changeText(EmailInput, "hello@bam.co")
  fireEvent.press(ValidateButton)
  const SuccessMessage = await waitForElement(() =>
    page.queryByText(wording.subscriptionSuccessful),
  )
  expect(SuccessMessage).toBeTruthy()
})
```

**fetchMock** is a library to mock HTTP calls. We'll use its most simple features in this test but you can check almost every aspect of your fetch calls with it

Home is the component representing the main page of our app

wording is an object containing all the strings used in our app

NEWSLETTER_ENDPOINT is the URL to call in order to subscribe to the newsletter

Let's see what each line does now!

### SET UP OF THE TEST

```js
fetchMock.post(NEWSLETTER_ENDPOINT, 200)
const page = render(<Home />)
```

The first thing we do is mock everything that needs to be mocked. In our case, it is the HTTP call to our Subscription API. For that, we will use fetchMock and simply mock the HTTP call and tell fetch to return a 200 response when it is called. It is important to note that we could be more precise. We could check the request parameters as well and send a custom response if required.

Then we render the page and save it in a constant. It will provide us with some utilities to look into our DOM.

### WHAT THE USER SEES

- Next step is to find out what the user sees when he arrives on the page and which elements he will interact with.
- Here, we see an input with an email placeholder, so that's what we look for, just as the user would. We do the same for the button and get it by its text.

```js
const EmailInput = page.getByPlaceholder(wording.emailPlaceholder)
const ValidateButton = page.getByText(wording.validateEmail)
```

As you can see, we're not fetching the elements with ids or css classes, the user does not know all that. If we were to look for an id for example, someone might inadvertently change the wording of the button. Then the test would still pass even though the user won't be able to see the correct button anymore.

However, there are indeed cases where using the id is the only way. For example when you want to find an element that does not have any text, label or any other property which could help you find it.

### WHAT THE USER DOES

Now that we found our components in our DOM, it's time we interact with them. First, the user changes the text inside the email input and then presses the validate button.

```js
fireEvent.changeText(EmailInput, "hello@bam.co")
fireEvent.press(ValidateButton)
```

fireEvent is a method provided by react-native-testing-library. It enables you to fire pretty much any native-like event in your DOM.

### WHAT FEEDBACK THE USER SHOULD EXPECT

Finally we wait for the success message to appear on the page and check that it does appear in the DOM.

```js
const SuccessMessage = await waitForElement(() =>
  page.queryByText(wording.subscriptionSuccessful),
)
expect(SuccessMessage).toBeTruthy()
```

waitForElement is a method provided by react-native-testing-library that either waits for your element to appear or times out. It is very useful each time you have asynchronous code running.

[blog.bam.tech/developer-news/how-to-test-your-react-native-app](https://blog.bam.tech/developer-news/how-to-test-your-react-native-app)
