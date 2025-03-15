I've created a new "library" called Didact and i'm using the createElement from there.

When you use jsx, you will need to compile it using babel or some tool like this.

To use babel you will need to do 2 things, the first one is to create a .babelrc config file and set it like this:

```json
{
  "presets": ["@babel/preset-react"]
}
```

this will tell babel that the preset you want to use is the react one (to transpile jsx into js)

then you need install this preset along with babel itself (babel we can install at the same time we run npx, so now we only install the preset)

```bash
npm install --save-dev @babel/preset-react
```

after this you just need to run the command that will compile the jsx file into javascript:

```bash
npx babel ./gosling.js --out-file ./gosling-compiled.js
```

remember to use gosling-compiled.js on html file, this will automatically make every jsx code use the Didact.createElement()!

## Interesting tip

when you use the preset-react, it will search for the React.createElement() function into your dependencies, if it doesn't found it, it will rises an error after compiling:

Uncaught ReferenceError: React is not defined

in order to avoid this and set babel preset's to search for our "library" function instead of the one coming from react, we use this pragma that tells the compiler to made the change.

```javascript
/** @jsx Didact.createElement */
```

## Fun fact

When you configure Babel to use this preset, it will look for JSX patterns regardless of the file extension.

[more about it](https://babeljs.io/docs/babel-preset-react)
