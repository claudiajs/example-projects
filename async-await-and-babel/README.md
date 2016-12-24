# Using Babel with Claudia.js

The AWS Node.js execution runtime still uses Node 4.3.2, and many modern ES6 features are not available there (notably, imports and async/await). You can use Babel to transpile more modern ES6 code into ES2015.

This example shows how to create a simple project that is using async/await and import, transpile it to promises and deploy it using Claudia.

The transpilation output folder (in this case `bin`) is excluded from version control in [`.gitignore`](.gitignore), but explicitly listed in the `files` section of `package.json`, so it will be deployed by Claudia.

## Usage

1. Run `npm install` to install the dependencies
2. Run `npm run transpile` to see the transpiled code in `/bin` directory
3. Run `npm run create` to transpile the code and deploy it to lambda
4. To update the code run `npm run update`, it will transpile and update the code

