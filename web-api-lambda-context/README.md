# Accessing Lambda Context from Api Builder Requests

This example shows how to access the [Lambda Context Object](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html) from a web API built using [`claudia-api-builder'`](https://github.com/claudiajs/claudia-api-builder). 

This might be useful if you want to access the internal Lambda request ID, log groups or streams automatically created for your Lambda function, or terminate the execution using some other mechanism, instead of the default API Builder workflow.

The context object is also useful if you want to detect which version of your function got called, for example if you're running multiple versions for development, testing and production. Check out the [Detecting Context Example](../detecting-context/) to see how you can use this to detect the version.

## Try it out

Install the dependencies:

```bash
npm install
```

Deploy the API to AWS:

```bash
npm start
```

The deployer will print out the web API URL when it completes. Paste that in your browser or execute using CURL, and you'll see the Lambda context details

## How it works

The Lambda context object gets assigned to `request.lambdaContext` (since `claudia-api-builder` 1.3.0), so you can just access all the context fields and methods directly. Check out [web.js](web.js) to see how it is actually used in the code.

