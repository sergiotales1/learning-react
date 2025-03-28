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

# HEAP memory

in the step-iii-and-iv we can see that the performUnitOfWork function is recursively creating a tree, allocating the dynamic objects in the heap, this function will link together parents, children and siblings.

The interesting part is that we're not using any other sort of storage to keep this tree of elements, only the HEAP!

Javascript runtime environment uses 2 sorts of memory, the stack that usually keeps functions and static variables and the heap.

The heap is where dynamic objects are, everything that keeps being referenced will be in the heap, we have for example this piece of code on the performUnitOfWork function:

PS: When a variable is no longer referenced, it becomes eligible for garbage collection, and the memory it occupied in the heap can be reclaimed.

<sub>Explanation before the example</sub>

```js
const newFiber = {
  type: element.type,
  props: element.props,
  parent: fiber,
  dom: null,
};

if (index === 0) {
  fiber.child = newFiber;
} else {
  prevSibling.sibling = newFiber;
}

prevSibling = newFiber;
```

This is creating a new fiber, this fiber will be linked to its parent and child (if has one), and it will also be linked to its sibling.

Each fiber doesn't directly has access to the whole tree, but they're connected to it so you can look through.

Take for example a fiber like this:

```js
let parentFiber = {
  dom: document.getElementById("root"),
  props: {} // don't need to understand this yet
  child: {
    dom: null,
    parent: {
      dom: document.getElementById("root"),
      child: {
          dom: null,
          props: {},
        }
    }
    sibling: {
      parent: {
        dom: document.getElementById("root"),
        child: {
            dom: null,
            props: {},
          }
      }
    }
    props: {} // don't need to understand this yet
  }
  props: {} // don't need to understand this yet
};
```

This structure can become complex, but you can see that we're establishing relationships between fibers. This allows us to perform DOM manipulation, like appending child DOM nodes to their parents, as demonstrated by this code.

```js
if (fiber.parent) {
  fiber.parent.dom.appendChild(fiber.dom);
}
```
