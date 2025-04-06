# This is all content that i'm reading on Rodrigo's [website](https://pomb.us/build-your-own-react/)

AI summary:
Here's a concise description of each **core function** in this Didact (React-like) implementation:

---

### **1. Element Creation**

#### `createElement(type, props, ...children)`

- **Purpose**: Creates a virtual DOM element (object representation).
- **Behavior**:
  - Converts JSX into a structured object with `type`, `props`, and `children`.
  - Wraps non-object children (e.g., strings) in `TEXT_ELEMENT` objects.

#### `createTextElement(text)`

- **Purpose**: Creates a virtual text node.
- **Behavior**:
  - Returns an object with `type: "TEXT_ELEMENT"` and `nodeValue` set to the text.

---

### **2. DOM Manipulation**

#### `createDom(fiber)`

- **Purpose**: Creates a real DOM node for a fiber.
- **Behavior**:
  - Creates either a `TextNode` (for `TEXT_ELEMENT`) or a regular DOM element.
  - Applies props/events via `updateDom`.

#### `updateDom(dom, prevProps, nextProps)`

- **Purpose**: Updates DOM attributes/event listeners efficiently.
- **Behavior**:
  - Removes old/changed event listeners.
  - Updates added/changed props (e.g., `className`, `style`).
  - Clears deleted props.

---

### **3. Render Pipeline**

#### `render(element, container)`

- **Purpose**: Starts the rendering process.
- **Behavior**:
  - Initializes `wipRoot` (work-in-progress root fiber) and schedules work via `requestIdleCallback`.

#### `workLoop(deadline)`

- **Purpose**: Schedules rendering in idle time.
- **Behavior**:
  - Processes units of work (`performUnitOfWork`) until time runs out.
  - Commits the finished work (`commitRoot`) when done.

#### `performUnitOfWork(fiber)`

- **Purpose**: Processes a single fiber (unit of work).
- **Behavior**:
  - Handles function/host components differently.
  - Returns the next fiber to process (child → sibling → parent).

---

### **4. Fiber Reconciliation**

#### `reconcileChildren(wipFiber, elements)`

- **Purpose**: Compares old/new children to determine updates.
- **Behavior**:
  - Reuses DOM nodes if types match (`UPDATE`).
  - Creates new nodes (`PLACEMENT`) or marks deletions (`DELETION`).

#### `commitRoot()`

- **Purpose**: Applies changes to the DOM.
- **Behavior**:
  - Processes deletions first, then commits all fiber changes (append/update/delete nodes).

#### `commitWork(fiber)`

- **Purpose**: Applies a single fiber's changes to the DOM.
- **Behavior**:
  - Handles `PLACEMENT`, `UPDATE`, or `DELETION` effects recursively.

---

### **5. Function Components & Hooks**

#### `updateFunctionComponent(fiber)`

- **Purpose**: Renders a function component.
- **Behavior**:
  - Initializes hooks (`useState`) and calls the component function to get children.
  - Triggers reconciliation for the returned children.

#### `useState(initial)`

- **Purpose**: Manages state in function components.
- **Behavior**:
  - Preserves state across re-renders using a `hook` object.
  - Queues updates and schedules re-renders via `setState`.

---

### **6. Helper Functions**

- `isEvent` / `isProperty` / `isNew` / `isGone`: Filter props for DOM updates.
- `commitDeletion`: Recursively removes DOM nodes marked for deletion.

---

### **Key Flow Summary**

1. **JSX → Virtual DOM**: `createElement` transforms JSX into objects.
2. **Render Phase**: `workLoop` + `performUnitOfWork` build the fiber tree.
3. **Reconciliation**: `reconcileChildren` diffs old/new fibers.
4. **Commit Phase**: `commitRoot` applies changes to the DOM.
5. **State Updates**: `useState` triggers re-renders via `setState`.

This mimics React’s core architecture (without optimizations like keys or batching).
