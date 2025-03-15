# Rest operator

on functions like this:

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
      children,
    },
  };
}
```

the rest will always create an array, containing values or not, if you use rest (...) it will create an array.

# npx

instals and run packages right away, we use this on step-I: babel compilation.
