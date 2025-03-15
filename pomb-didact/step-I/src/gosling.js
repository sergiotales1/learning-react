// We are not rendering anything, just create the createElement function

// When it's a object with type and props, we return it as an element, when it's a string or number, we create a TEXT_ELEMENT object (which kinda transforms into an element as well)

function createElement(type, props, ...children) {
  // children will always be an array because of the rest operator
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const Didact = {
  createElement,
};

const element = Didact.createElement("div", null, "Hello World");
console.log(element);
