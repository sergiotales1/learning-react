# Concurrent mode

On step III we have the implementation of this workLoop function with some window.requestIdleCallback tricks:

We are trying to divide the render process between blocks (units of work) instead of rendering them all at once and blocking the main thread.

```js
// Next fiber to be rendered
let nextUnitOfWork = null
​
// Callback that will run every time the browser is idle
function workLoop(deadline) {
  let shouldYield = false // Variable that keeps track of browser state
  while (nextUnitOfWork && !shouldYield) { // Loop that will perform each unit of work
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1 // Logic to checks if the browser's idle time is over
  }
  requestIdleCallback(workLoop) // Recursive call so even if we stopped performing work units, as soon as the browser is idle again, we're ready to get back into work
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

## How it works?

The requestIdleCallback will call the workLoop function when the browser is not busy, it will start our rendering process

```js
requestIdleCallback(workLoop);
```

During the execution of workLoop, it tracks two things:

1- nextUnitOfWork (which is essentially a fiber to be rendered).
2- The shouldYield variable

The while loop will continue running until shouldYield is true or there are no remaining units of work.

Imagine that we're trying to render this:

```js
Didact.render(
  <div>
    <h1>
      <p /> // imagine that we have an onclick event on <p>
      <a />
    </h1>
    <h2 />
  </div>,
  container
);
```

The <div> will be the first unit of work. It will start rendering its children one by one, making each child the next unit of work, until it reaches <p>, which has an onClick event attached to it.

Now, suppose that as soon as <p /> renders, the user clicks on it.

At this moment, the workLoop function will stop because deadline.timeRemaining() will be < 1.

The browser is no longer idle—it is now handling the action triggered by <p>'s onClick event. However, since we anticipated that this might happen, we already called requestIdleCallback(workLoop), ensuring that the work process will resume as soon as the browser finishes handling the event.

This is how we keep rendering without fully blocking the main thread.

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

# Problems

we're keeping a reference of each fiber into our virtual DOM, is this right ? performative?
