# Using Babel with Claudia.js

The AWS Node.js execution runtime still uses Node 4.3, and many modern ES6 features are not available there (notably, imports and async/await). You can use Babel to transpile more modern ES6 code into ES2015.

This example shows how to create a trivial transpiled project and deploy it using Claudia.

The transpilation output folder (in this case `bin`) is excluded from version control in [`.gitignore`](.gitignore), but explicitly listed in the `files` section of `package.json`, so it will be deployed by Claudia.

