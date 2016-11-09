# meteor-client-packages-meteor

###### YOU CAN CONTINUE TO USE THIS PACKAGE BUT YOU HAVE AN ALTERNATIVE THAT REFERENCE DIRECTLY ANY LOCAL METEOR SERVER : [meteor-webpack-client](https://www.npmjs.com/package/meteor-webpack-client).

Use Meteor's client packages side in a non Meteor project.

The packages given are :
- Accounts password
- Accounts UI
- Blaze
- DDP
- Minimongo
- Tracker

and all the individual depedencies.

### Installation

#### NPM
`npm install --save meteor-client-packages-meteor@1.3.5-0.0.7` for Meteor 1.3.5

`npm install --save meteor-client-packages-meteor@1.3.5-1.0.7` for Meteor 1.3.5.1

`npm install --save meteor-client-packages-meteor@1.4.0-0.0.7` for Meteor 1.4

`npm install --save meteor-client-packages-meteor@1.4.0-1.0.7` for Meteor 1.4.0.1

`npm install --save meteor-client-packages-meteor@1.4.1-0.0.7` for Meteor 1.4.1

`npm install --save meteor-client-packages-meteor@1.4.1-1.0.7` for Meteor 1.4.1.1

`npm install --save meteor-client-packages-meteor@1.4.1-2.0.7` for Meteor 1.4.1.2

`npm install --save meteor-client-packages-meteor@1.4.1-3.0.7` for Meteor 1.4.1.3

`npm install --save meteor-client-packages-meteor@1.4.2-0.0.7` for Meteor 1.4.2

`npm install --save meteor-client-packages-meteor@1.4.2-1.0.7` for Meteor 1.4.2.1

### Usage

#### 1. Meteor setup :

To define `__meteor_runtime_config__` global variables you can make a `meteor-runtime-config.js` file in your root.
The following is the default if empty :
```js
export const __meteor_runtime_config__ = {
  meteorEnv: {},
  DDP_DEFAULT_CONNECTION_URL: 'http://localhost:3000',
  PUBLIC_SETTINGS: {
    __global_scope__: false
  }
};
```
* Set DDP connection url with `DDP_DEFAULT_CONNECTION_URL`
* Make Meteor objects global with `__global_scope__: true`.

#### 2. Load the meteor-client-packages-meteor packages :

   To use with webpack you have to add the following code at the end of your `webpack.config.js` file :
```js
config = generateConfig(
  config,
  require('meteor-client-packages/easy-webpack')()
);
```

   `[name]` have to be in the filename of css files of shunks :
```js
require('@easy-webpack/config-css')
  ({ filename: '[name].styles.css', allChunks: true, sourceMap: false }),

```

   It makes it possible to import the packages as in Meteor 1.3+ :
```js
import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp';
```

`meteor-client-packages/easy-webpack` has tow optional parameters :
- absoluteNodeModulesPath: (default to false) node_modules must have absolute path (usefull with symlink). It has not been tested without Aurelia.
- rootDir: (default to current root dir) the base dir for node_modules if absoluteNodeModulesPath is true

The packages bundled by webpack are only those imported by your code with their dependencies.

#### 3. Versions

   The version of this package takes the same version as the Meteor version for witch the Meteor packages have been compiled.
```http
meteor-client-packages-meteor version : 1.3.5-0.x.x  <==  Meteor version : 1.3.5
meteor-client-packages-meteor version : 1.3.5-1.x.x  <==  Meteor version : 1.3.5.1
meteor-client-packages-meteor version : 1.4.0-0.x.x  <==  Meteor version : 1.4
meteor-client-packages-meteor version : 1.4.0-1.x.x  <==  Meteor version : 1.4.0.1
meteor-client-packages-meteor version : 1.4.1-0.x.x  <==  Meteor version : 1.4.1
meteor-client-packages-meteor version : 1.4.1-1.x.x  <==  Meteor version : 1.4.1.1
meteor-client-packages-meteor version : 1.4.1-2.x.x  <==  Meteor version : 1.4.1.2
meteor-client-packages-meteor version : 1.4.1-2.x.x  <==  Meteor version : 1.4.1.3
meteor-client-packages-meteor version : 1.4.2-0.x.x  <==  Meteor version : 1.4.2
meteor-client-packages-meteor version : 1.4.2-1.x.x  <==  Meteor version : 1.4.2.1
```

#### 4. Your own NPM package for other METEOR packages
  You have to use this NPM Package as a model. To change the packages to include you have to :
  1. Change the file `__src__\packages` witch has to include the Meteor packages name you need
  2. Change the file `__src__\meteor-version` to compile to the good version of Meteor when this makes sense
  3. Change the file `__src__\meteor-packages-meteorVersion` to define dependencies and `package-version`
  4. In `dependencies` of the `package.json` file, replace `meteor-client-packages` by `meteor-client-packages-meteor` 
  5. Do `npm run build` or `npm start`
  6. Don't forget `git add *`, `git commit -m "new version"`, `git push` and `npm publish`

   Don't include a Meteor package already in this NPM package in the file `__src__\meteor-packages-meteorVersion.json`.

   Your have to create your NPM package with a name like `meteor-client-packages-...`.

   All the `meteor-client-packages-...` NPM packages are loaded by webpack to define the aliases of the Meteor packages.

### What I've done
The code is in the native compiled version of Meteor for a given version.

I wanted to be able to use meteor's modules with webpack using `import {...} from 'meteor/...'`.
