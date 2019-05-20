# nod

[![NPM version](https://img.shields.io/npm/v/generator-nod.svg?style=flat-square)](https://npmjs.org/package/generator-nod)
[![Build Status](https://img.shields.io/travis/diegohaz/nod/master.svg?style=flat-square)](https://travis-ci.org/diegohaz/nod) [![Coverage Status](https://img.shields.io/codecov/c/github/diegohaz/nod/master.svg?style=flat-square)](https://codecov.io/gh/diegohaz/nod/branch/master)

NodeJS module generator/boilerplate.

<p align="center"><img src="https://cloud.githubusercontent.com/assets/3068563/21958520/77e4f45e-da97-11e6-9685-fe380a9cce3d.gif"></p>

## Features

-   [**Babel**](https://babeljs.io/) - Write next generation JavaScript today.
-   [**Jest**](https://facebook.github.io/jest) - JavaScript testing framework used by Facebook.
-   [**ESLint**](http://eslint.org/) - Make sure you are writing a quality code.
-   [**Prettier**](https://prettier.io/) - Enforces a consistent style by parsing your code and re-printing it.
-   [**Flow**](https://flowtype.org/) - A static type checker for JavaScript used heavily within Facebook.
-   [**Travis CI**](https://travis-ci.org) - Automate tests and linting for every push or pull request.
-   [**Documentation**](http://documentation.js.org/) - A documentation system so good, you'll actually write documentation.
-   [**Conventional Changelog**](https://github.com/conventional-changelog/conventional-changelog) - Generate a changelog from git metadata.

## Install

The easiest way to use **nod** is through the Yeoman Generator.

```sh
$ npm install -g yo generator-nod
$ yo nod
```

If you don't want to use the generator, you can also download or `git clone` this repo

```sh
$ git clone https://github.com/diegohaz/nod my-module
$ cd my-module
$ rm -rf .git
$ npm install # or yarn
```

Just make sure to edit `package.json`, `README.md` and `LICENSE` files accordingly with your module's info.

## Commands

```sh
$ npm test # run tests with Jest
$ npm run coverage # run tests with coverage and open it on browser
$ npm run lint # lint code
$ npm run docs # generate docs
$ npm run build # generate docs and transpile code
```

### Publish

```sh
$ npm version patch|minor|major
$ npm publish
```

It'll automatically run `test`, `lint`, `docs`, `build`, generate `CHANGELOG.md`, and push commits and tags to the remote repository.

## Removing stuff

<details><summary><strong>Flow</strong></summary>

1.  Remove `.flowconfig` file.

2.  Remove `flow` from `package.json`:

    ```diff
      "scripts": {
    -   "flow": "flow check",
    -   "flowbuild": "flow-copy-source src dist",
    -   "prebuild": "npm run docs && npm run clean && npm run flowbuild",
    +   "prebuild": "npm run docs && npm run clean",
      },
      "devDependencies": {
    -   "@babel/preset-flow": "^7.0.0",
    -   "eslint-plugin-flowtype": "^2.50.0",
    -   "eslint-plugin-flowtype-errors": "^3.5.1",
    -   "flow-bin": "^0.81.0",
    -   "flow-copy-source": "^2.0.2",
      }
    ```

3.  Remove `flow` from `.babelrc`:

    ```diff
      "presets": [
    -   "@babel/preset-flow"
      ]
    ```

4.  Remove `flow` from `.eslintrc`:

    ```diff
      "extends": [
    -   "plugin:flowtype/recommended",
    -   "prettier/flowtype"
      ],
      "plugins": [
    -   "flowtype",
    -   "flowtype-errors"
      ],
      "rules": {
    -   "flowtype-errors/show-errors": "error"
      }
    ```

5.  Run `yarn`.

</details>

<details><summary><strong>Documentation</strong></summary>

1.  Remove `documentation` from `package.json`:

    ```diff
      "scripts": {
    -   "docs": "documentation readme src --section=API",
    -   "postdocs": "git add README.md",
    -   "prebuild": "npm run docs && npm run clean",
    +   "prebuild": "npm run clean",
      },
      "devDependencies": {
    -   "documentation": "^8.0.0",
      }
    ```

2.  Run `yarn`.

</details>

## Adding stuff

<details><summary><strong>TypeScript</strong></summary>
  
1. Install dependencies:

    ```sh
    yarn add -D @babel/preset-typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript
    ```

2.  Update `package.json`:

    ```diff
    + "types": "dist/ts/src",
      "scripts": {
    +   "type-check": "tsc --noEmit",
    -   "lint": "eslint .",
    +   "lint": "eslint . --ext js,ts,tsx",
    -   "build": "babel src -d dist",
    +   "build": "tsc --emitDeclarationOnly && babel src -d dist -x .js,.ts,.tsx",
      },
      "lint-staged": {
    -   "*.js": [
    +   "*.{js,ts,tsx}": [
    -     "eslint --fix",
    +     "eslint --fix --ext js,ts,tsx",
          "git add"
        ]
      }
    ```

3.  Create `tsconfig.json`

    ```json
    {
      "compilerOptions": {
        "outDir": "dist/ts",
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node",
        "jsx": "react",
        "strict": true,
        "declaration": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "stripInternal": true
      }
    }
    ```

4.  Update `.babelrc`:

    ```diff
      "presets": [
    +   "@babel/preset-typescript"
      ]
    ```

5.  Update `.eslintrc` with these settings:

    ```json
      "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
      },
      "overrides": [
        {
          "files": ["**/*.ts", "**/*.tsx"],
          "parser": "@typescript-eslint/parser",
          "parserOptions": {
            "project": "./tsconfig.json"
          },
          "plugins": [
            "@typescript-eslint"
          ],
          "rules": {
            "no-undef": "off",
            "no-unused-vars": "off",
            "no-restricted-globals": "off"
          }
        }
      ]
    ```

</details>

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [createStyles](#createstyles)
    -   [Parameters](#parameters)
-   [getCenters](#getcenters)
    -   [Parameters](#parameters-1)
-   [getCharYPos](#getcharypos)
    -   [Parameters](#parameters-2)
-   [measureText](#measuretext)
    -   [Parameters](#parameters-3)

### createStyles

Generates the styles for the wrapper and each of the text characters for the animation to happen.

#### Parameters

-   `text` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** text to be rendered. It is used to generate a style for each character.
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with options (optional, default `{}`)
    -   `options.fontSize` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontSize of the text when the user hovers it. (optional, default `'20px'`)
    -   `options.lineHeight` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** lineHeight of the text when the user hovers it. (optional, default `1.3`)
    -   `options.fontFamily` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontFamily of the text. (optional, default `'Georgia'`)
    -   `options.charCenters` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;{x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), y: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}>** position of the characters before the user hovers them. (optional, default `undefined`)

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

### getCenters

This is a function that calculates a set of points evenly distributed in a defined space.
It uses the Lloyd's relaxation on a Voronoi diagram to distribute the points.

#### Parameters

-   `numberOfCenters` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** the number of points that need to be distributed in the space.
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with options (optional, default `{}`)
    -   `options.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** height of the space (optional, default `100`)
    -   `options.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** height of the space (optional, default `100`)
    -   `options.maxIterations` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** maximum number of iterations that the Lloyd's relaxation will run through.
        More iterations mean a more optimal solution, however it can take a lot more time. Less iteration generate less optimal solutions. (optional, default `20`)
    -   `options.acceptableError` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** error that if achieved between iterations the relaxation process will stop, even if the iterations are not completed.
        Bigger error with compute results faster. (optional, default `1e-6`)
    -   `options.sorting` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** sorting applied to the generated points. 'none' no sorting applied. 'sortByX' sort ascending points using X.
        'sortByY' sort ascending points using Y. 'costFunction' sorts points using a cost function like `x + costFunctionYWeight * y`. (optional, default `'none'`)
    -   `options.costFunctionYWeight` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** weight applied to Y in the sorting cost function if sorting='costFunction'. (optional, default `1`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;{x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), y: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}>>** returns a Promise that when resolved returns an array with the points positions

### getCharYPos

This function return the CSS `left` parameter for the characters of the input index.
Currently the makes the text to be centered on the space.

#### Parameters

-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the characters to calculate the CSS `left` parameter
-   `totalWidth` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** total width of the text to render
-   `partialWidths` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** 
-   `partialWidth` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** array with the width of each character sorted by index position.

### measureText

Measures the widths and the height of a text

#### Parameters

-   `text` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)** text to be measured or array with multiple lines of text.
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with options (optional, default `{}`)
    -   `options.fontSize` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontSize of the text. (optional, default `'20px'`)
    -   `options.lineHeight` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** lineHeight of the text. (optional, default `1.3`)
    -   `options.fontFamily` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontFamily of the text. (optional, default `'Georgia'`)
    -   `options.fontWeight` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontWeight of the text. (optional, default `400`)
    -   `options.fontStyle` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** fontStyle of the text. (optional, default `'normal'`)
    -   `options.canvas` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** canvas used to render the text to measure. If none provided, one us created and used. (optional, default `createdbydefault`)

Returns **{text: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), width: {value: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), units: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}, height: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}** returns an object with the width, height and the text or longest text in case
of multiline.

## License

MIT © [Diego Haz](https://github.com/diegohaz)
