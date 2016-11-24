# Using environment variables

A simple project demonstrating how to manage and use [Lambda environment variables](http://docs.aws.amazon.com/lambda/latest/dg/env_variables.html).

Check out the `scripts` section of [`package.json`](package.json) for details on what individual commands are doing, and [Managing Lambda Versions Tutorial](https://claudiajs.com/tutorials/versions.html) for more information on what is happening under the hood.

To try it out, run:

* `npm install` to fetch the dependencies
* `npm run create` to create the `development` version with some stage variables
* `npm run check-dev` to execute the `development` version of the Lambda function and print out the variables
* `npm run set-production` to create a `production` version from the current code, and changed the variable name
* `npm run check-production` to execute the `production` version and print out the names. Note that the PROGRESS variable was removed because it was not specified in the previous update.
* `npm run check-dev` to execute the `development` version of the Lambda function and print out the variables. Note that the old values are still there, as `development` is pointing to an older version
* `npm run reassign-dev` to reassign the development alias to the latest version without changing any vars. 
* `npm run check-dev` to execute the `development` version of the Lambda function and print out the variables. Note that the new values from production are now used. `dev` and `production` are pointing to the same numerical version, and the last update did not change any variables.
* `npm run update` to update the development version and another variable name
* `npm run check-dev` to execute the `development` version of the Lambda function and print out the variables
* `npm run load-from-json` to load both variables into the `development` alias
* `npm run check-dev` to execute the `development` version of the Lambda function and print out the variables
* `npm run check-production` to see the old values in the `production` environment. Note that they are unchanged.
