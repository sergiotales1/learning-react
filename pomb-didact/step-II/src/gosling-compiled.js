function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child))
    }
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function render(element, container) {
  const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") // creates a DOM node special to hold text content
  : document.createElement(element.type); // creates a DOM node

  // If the property is not children, we add it to the DOM node
  // It can be any property, like onClick, className, etc.
  const isProperty = key => key !== "children";
  Object.keys(element.props).filter(isProperty).forEach(name => {
    // add properties to the DOM node
    dom[name] = element.props[name];
  });

  // We recursively render the children
  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}
const Didact = {
  createElement,
  render
};

/** @jsx Didact.createElement */
const element = Didact.createElement("div", {
  style: "background: salmon"
}, Didact.createElement("h1", null, "Hello World"), Didact.createElement("h2", {
  style: "text-align:right"
}, "from Didact"));
const second_element = createElement("div", {
  className: "container",
  onclick: () => console.log("clicked")
}, element);
const container = document.getElementById("root");
Didact.render(second_element, container);
