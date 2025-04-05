# Props

Props (properties) are essentially all the sorts of data that we pass from parent to child.
This can be html attributes such as style, class. Events like onInput or onClick, functions and even objects.
When we create element with some jsx like this:

```jsx
const element = (
  <div>
    <input
      randomObj={{ a: 1, b: 2 }}
      type="text"
      style={{ fontSize: "2rem", color: "red" }}
      onInput={updateValue}
      value={value}
    />
    <h2 style={{ color: "blue" }}>Hello {value}</h2>
  </div>
);
Didact.render(element, container);
```

we're calling createElement on this div, then with the input with these values passed as properties like this:

```javascript
var element = Didact.createElement(
  "div",
  null,
  Didact.createElement("input", {
    randomObj: {
      a: 1,
      b: 2,
    },
    type: "text",
    style: "font-size:2rem",
    onInput: updateValue,
    value: value,
  }),
  Didact.createElement(
    "h2",
    {
      style: {
        color: "blue",
      },
    },
    "Hello ",
    value
  )
);
```

Some of these properties are used when we add the element to the dom, others are only used inside themselves (when we use components for example).
There are some key rules about props that we need to remember, they are all read-only (if you need to change this type of data inside the child component use state instead). And they're always passed down from their parents.
