#Claudia.js Example projects

<img src="https://claudiajs.github.io/claudiajs.com/assets/claudiajs.svg" height="300" align="right" />

## Background processing

* [Hello World](hello-world) &ndash; shows a trivial Node.js Lambda function and how to set up deployment using Claudia.js
* [Using NPM Modules](using-npm-modules) &ndash; a slightly more complex function, shows how to deploy third party dependencies using Claudia.js
* [S3 File Processing](s3-file-processing) &ndash; an example service that converts files uploaded to S3; shows how to wire up Lambda to respond to S3 events
* [Pandoc S3 Converter](pandoc-s3-converter) &ndash; a more complex example that converts S3 files to .docx using Pandoc
* [Website Email Alert](website-email-alert) &ndash; periodically check a URL and send an e-mail if it is not available; shows how to send e-mails using SES and set up Lambda functions as scheduled recurring events
* [Detecting Context](detecting-context) &ndash; detect if a function was called for development or production, in order to load the right configuration
* [Recursive invocation](recursive-invoke) &ndash; an example of how Lambda can asynchronously call itself to work around timing limitations

## Web API

* [Web API](web-api) &ndash; a simple REST api, shows how to configure and deploy an API Gateway interface along with the Lambda function
* [Web Serving HTML](web-serving-html) &ndash; shows how to change error and success content types and response codes, and how to perform browser redirects
* [Generic handlers](web-api-generic-handlers) &ndash; shows how to capture dynamic paths and set up handlers for any content type easily
* [Custom response codes](web-api-custom-status-code) &ndash; shows how to change status codes for response
* [Custom Headers](web-api-custom-headers) &ndash; shows how to return custom headers from API responses
* [Custom CORS origins](web-api-custom-cors) &ndash; shows how to control allowed CORS origins/headers
* [Intercepting requests](intercepting-requests) &ndash; an example showing how to prevent or modify requests
* [Post-deploy variable configuration](web-api-postdeploy-configuration) &ndash; shows how to set up post-deploy hooks to prompt users for stage variables
* [Generic post-deploy steps](web-api-postdeploy) &ndash; shows how to set up post-deploy hooks for automatic configuration
* [Using Lambda Context](web-api-lambda-context) &ndash; shows how to access the Lambda Context object from projects built using `claudia-api-builder`
* [DynamoDB CRUD](dynamodb-example) &ndash; a simple document store, shows how to use DynamoDB and connect it to a CRUD REST API. Also shows how to configure a single Lambda function to work with different resources for development, testing and production.
* [GraphQL Endpoint](graphql-example) &ndash; GraphQL CRUD operations, using ES2015 transpiled by Babel, using DynamoDB for persistence.
* [GitHub Repository Labels](github-repo-labels) &ndash; a simple image server, shows how to map URL path components to arguments, how to customise response types and how to connect to third party REST APIs
* [Using AWS Mobile Analytics for server-side events](aws-mobile-analytics) &ndash; log events into AWS Mobile Analytics for easy internal telemetry
* [Custom Authorizers](custom-authorizers) &ndash; a simple example of how to set up custom authorizers in API Gateway

## Proxy API

* [Deploying a Proxy API](deploy-proxy-api) &ndash; an example of how to create an API Gateway that will proxy all requests directly to a Lambda function
* [Running Express Apps in AWS Lambda](express-app-lambda) &ndash; an example of how to deploy an existing Express app with minimal changes to Lambda

## Chat-bots

* [Simple Bot](simple-bot) &ndash; an example demonstrating how to receive and respond with simple text messages
* [Facebook Messenger Bot with Buttons](bot-with-buttons) &ndash; an example showing how to create more complex platform specific messages, for example Facebook buttons
* [Space Explorer Bot](https://github.com/stojanovic/space-explorer-bot) &ndash; uses NASA's API to get the data and images about the space, shows how to use Facebook Template builders for response messages.
* [Slack Delayed Reply](slack-delayed-response) &ndash; an example showing how to send delayed and multiple replies for Slack slash commands.

## Examples in other repositories

* [Slack Ping Command](https://github.com/marcusoftnet/pingu), showing how to create a simple Slack command, pinging a Web URL and reporting the result
* [State-Action-Model](https://github.com/jdubray/sam-samples/tree/master/crud-blog-lambda) example, showing how to use the [SAM pattern](http://sam.js.org/) to create a Lambda-powered blog


## More information

For more information on the Web API configuration syntax, check out the [Claudia API Builder](https://github.com/claudiajs/claudia-api-builder/blob/master/README.md) project. For more information on Claudia.js options, see the [Command Line Usage](https://github.com/claudiajs/claudia/tree/master/docs).

[![Join the chat at https://gitter.im/claudiajs/claudia](https://badges.gitter.im/claudiajs/claudia.svg)](https://gitter.im/claudiajs/claudia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Prerequisites

AWS Lambda currently runs Node.js version 4.3.2 (optionally, you can downgrade to 0.10.36 by using `--runtime` when [creating the function](https://github.com/claudiajs/claudia/blob/master/docs/create.md)). It's best to use that version for testing. To get started, make sure your credentials are configured. See the [ClaudiaJS Getting Started Guide](https://github.com/claudiajs/claudia/blob/master/getting_started.md) for more information.
