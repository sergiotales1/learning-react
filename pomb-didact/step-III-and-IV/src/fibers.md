# Fibers

Each fiber is an element and it has 3 links (usually at least 2, the third is situational).

![image](https://i.imgur.com/cTgzsHQ.png)

## Fibers search for

1º: child
2º: if there's no child, the fiber's sibling will be performed
3º: if there's no child nor a sibling, the "uncle" will be the next unit of work to be performed
4º: if the "uncle" doesn't have a child or the parent doesn't have a sibling, it will keep bubbling up until it finds a parent with sibling (uncle") and then it will repeat it until it reaches the root

# requestIdleCallback

This callback is part of the window interface and it will perform a callback when nothing is happening on the browser (during idle times). Using this is more performant.

Diverse things can change the state of browser from idle to busy, ui events, setInterval, ajax events and more.

[gpt explains requestIdleCallback](https://chatgpt.com/share/67d6f9d2-1e5c-800f-9b9e-aca51acfcef4)

```js
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    console.log(deadline.timeRemaining());
  }
});
```

```ts
type Element = {
  type: string | Function | null; // Could be a string (div, h1, etc.) or a function (component)
  props: {
    children: FiberElement[];
    [key: string]: any; // Allows additional props like `onClick`
  };
};

type FiberElement = Element | string | number | boolean | null; // Can be a React-like element or a primitive value

type Fiber = {
  type: string | null;
  dom: HTMLElement | Text | null; // Can be an HTML element or a text node
  parent: Fiber | null; // Reference to the parent fiber
  child: Fiber | null; // Reference to the first child
  sibling: Fiber | null; // Reference to the next sibling
  props: {
    children: FiberElement[];
    [key: string]: any;
  };
};

type NextUnitOfWork = Fiber | null; // The next fiber to be worked on
```
