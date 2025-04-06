# Function component

there are three types of element components that we must remember

React components -
Component instances -
React Elements -

When we use a function component (be it in jsx or plain js), we're sending as argument to createElement a **reference** of the function
just like this:

```js
var element = Didact.createElement(Counter, null);
```

### Why do we need updateFunctionComponent and reconcileChildren for function components?

Gemini's explanation:
Function components don’t have DOM nodes themselves—they return JSX that resolves to DOM elements. To render them, we must first execute the function (to get its children) and then use reconcileChildren to link those children to the Fiber tree. This allows the function component to manage state and lifecycle while delegating rendering to its returned elements.

My explanation:
Functions don't have dom nodes so we can't connect them with anything. Instead, they return JSX (React elements) that resolve to DOM nodes and we can attach this function component to that node and render that node (the function component is going to be responsible for the lifecycle and to keep the state of the Element that this function is going to return). In this way we need to execute the function component in order to access its "children" that are going to be rendered in the dom. After getting the children of that function component we call reconcileChildren that will do the linking between parent, child and sibling.

```js
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
```

## Finally, how do we append to the dom function components?

We don't. We append only their child (the React element returned by these functions), see in code what we do to append items to the dom:

```js
let domParentFiber = fiber.parent;
while (!domParentFiber.dom) {
  domParentFiber = domParentFiber.parent;
}
```

First we get a fiber.parent that has DOM, in the case of function components, they don't have DOM so we do this while loop to get the nearest parent, this is the one we will use to append the dom element coming from the return of the Function Component execution.

and in order to don't incorrectly render the function component we use this that will filter out every fiber that doesn't have a DOM.

```js
if (fiber.effectTag === "PLACEMENT" && fiber.dom != null)
```

#### Fibers are react components, which includes functional components

## React component lifecycle

The React component lifecycle refers to the series of events that occur from the moment a component is created and mounted onto the DOM (Document Object Model) to the moment it's unmounted and removed from the DOM. It essentially describes the different stages a component goes through during its existence.

# Object reference in memory

Through the whole library we use the same object reference to 2 variables at the same time modifying them.
But the part that most intrigued me is this one:

```js
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
}
```

here both fiber and wipFiber point to the same object in memory so everything that wipFiber changes, will change also in the memory affecting the tree since the references from parent and child will change along with the wipFiber changes
the references are actually pointers (parent, sibling and child).
you can check a working example of this:

```js
let child = wipRoot;
while (child) {
  console.log("test"); // if you comment out wipFiber.hooks.push(hook); it won't print the child with hooks anymore, that confirms that the whole three has references to the variable that had changed the hooks array
  console.log(child?.hooks);
  child = child.child;
}
```
