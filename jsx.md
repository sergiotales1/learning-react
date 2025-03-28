## What is jsx ?

Jsx é uma syntax extension de javascript que permite juntar no mesmo arquivo:
html,
javascript,
css,

unindo as markup languages com a logica de Javascript.

All this is possible with Babel which transpile jsx code into js code compatible with most browsers

[more about it on react jsx docs](https://react.dev/learn/writing-markup-with-jsx)

## Custom Components

In React, a component is fundamentally a Javascript function that accepts properties (props)

- Babel takes the JSX syntax and transforms it into a React.createElement call (in the classic runtime), or calls the appropriate functions from the react/jsx-runtime (in the automatic runtime).

Example:

```js
function MyComponent({AnotherComponent}){
  return <AnotherComponent>
}

<MyComponent AnotherComponent={AnotherComponent}>


// will be translated to:

React.createElement(MyComponent, {
  AnotherComponent: React.createElement(AnotherComponent, null)
});
```
