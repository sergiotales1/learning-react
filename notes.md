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

# Closures

What are closures ?
Every javascript function is a closure; that means that this function "remembers" exactly the value of its free variables, it keeps in memory references to the exact same place of the variables at that time, for example

```js
function add(x) {
  return function closure(y) {
    return x + y;
  };
}
```

Here:

1. The function named add has only one variable, named x, which is not a free variable because it is defined within the scope of add itself.
2. The function named closure has two variables, named x and y, out of which x is a free variable because it is defined in the scope of add (not closure) and y is not a free variable because it is defined in the scope of closure itself.
   <sub>source: https://stackoverflow.com/questions/27092038/what-exactly-does-closing-over-mean
   </sub>

So, even if we have other add functions and it's variables change, this add function won't have other value, because it remembers the free variables that it closes over

## What it has to do with react?

Check the useState function for example, setState is a function declared inside the useState function to leverage the "free" variables that it can use with closures, in this case is the hook variable which "remembers" exactly which fiber it's referencing so in this way we can define this useState inside any other function and it would still work because they're independent from one another.
