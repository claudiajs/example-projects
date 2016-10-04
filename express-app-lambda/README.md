# Running Express apps in AWS Lambda

This is a simple example that shows how to deploy an existing [Express](http://expressjs.com/) application, with minimal changes, to AWS Lambda.

## Running the example

1. run `npm install` to grab the dependencies
2. run `npm run generate-proxy` to create a simple proxy API for the express app
3. run `npm run deploy` to send everything up to AWS Lambda

The third step will print out a URL you can use to access the express app.

## Updating the app

1. Change [`app.js`](app.js)
2. (Optionally) use `npm install <PACKAGE NAME> -S` to install additional dependencies (always save them to `package.json` using `-S`)
3. Run `npm run update` to send the new version up to AWS. No need to generate the proxy again

## More information and limitations

See the [Running Express Apps in AWS Lambda](https://claudiajs.com/tutorials/serverless-express.html) tutorial.
