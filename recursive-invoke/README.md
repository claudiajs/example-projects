# Recursive invocation example

This example demonstrates how a lambda function can recursively invoke itself, to work around timing limitations. 

## Running the example

* call `npm install` to grab the dependencies
* call `npm start` to set up the function
* call `npm test` to send an initial test event, which will cause several recursive calls
* Check the execution logs using CloudWatch:
  
  ```bash
  aws logs filter-log-events --log-group /aws/lambda/recursive-invoke | grep received
  ```
  
You should see several calls, with the counter decrementing from 5 to 0.

## How it works

The key trick is to call `claudia create` with `--allow-recursion` (check the [package.json](package.json) `start` script). This will set up IAM permissions so the Lambda function is allowed to execute itself. 

The actual recursive call is on line 10 of [index.js](index.js). The `Qualifier` setting ensures that the same version of the function gets invoked, so you can safely run multiple versions of the function (eg for development, testing and production). 

