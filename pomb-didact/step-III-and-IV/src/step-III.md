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
