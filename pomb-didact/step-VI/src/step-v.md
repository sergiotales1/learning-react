# What's new?

he primary difference in this step is the removal of 'lazy rendering.

In the previous steps we used to render the elements like this:

```js
if (fiber.parent) {
  return fiber.parent.dom.appendChild(fiber.dom);
}
```

Previously, if the browser needed to take control, we would render incomplete UIs. To address this, we now track the entire tree
using the wipRoot (work in progress) variable.

Once nextUnitOfWork is null, we render the entire tree.
