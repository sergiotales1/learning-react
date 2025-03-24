// gosling.test.js

let Didact;
describe("step-iii-and-iv tests", () => {
  beforeEach(() => {
    Didact = require("../step-III-and-IV/src/gosling-compiled.js");
  });

  test("should render the element", () => {
    /** @jsx Didact.createElement */
    const element = (
      <div style="background: salmon">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Didact</h2>
      </div>
    );

    const container = document.createElement("div");
    Didact.render(element, container);

    expect(container.innerHTML).toBe(`
      <div style="background: salmon">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Didact</h2>
      </div>
      `);
  });
});
