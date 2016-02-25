#Claudia.js Example projects

<img src="https://claudiajs.github.io/claudiajs.com/assets/claudiajs.svg" height="150" align="right" />

  * [Hello World](hello-world) - shows a trivial Node.js Lambda function and how to set up deployment using Claudia.js
  * [Using NPM Modules](using-npm-modules) - a slightly more complex function, shows how to deploy third party dependencies using Claudia.js
  * [S3 File Processing](s3-file-processing) - an example service that converts files uploaded to S3; shows how to wire up Lambda to respond to S3 events
  * [Web API](web-api) - a simple REST api, shows how to configure and deploy an API Gateway interface along with the Lambda function
  * [Web Serving HTML](web-serving-html) - shows how to change error and success content types and response codes, and how to perform browser redirects
  * [Website Email Alert](website-email-alert) - periodically check a URL and send an e-mail if it is not available; shows how to send e-mails using SES and set up Lambda functions as scheduled recurring events

For more information on the Web API configuration syntax, check out the [Claudia API Builder](https://github.com/claudiajs/claudia-api-builder/blob/master/README.md) project. For more information on Claudia.js options, see the [Command Line Usage](https://github.com/claudiajs/claudia/blob/master/bin/usage.txt).

[![Join the chat at https://gitter.im/claudiajs/claudia](https://badges.gitter.im/claudiajs/claudia.svg)](https://gitter.im/claudiajs/claudia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Prerequisites

AWS Lambda currently runs Node.js version 0.10.36, so it's best to use that version for testing. To get started, make sure your credentials are configured. See the [ClaudiaJS Getting Started Guide](https://github.com/claudiajs/claudia/blob/master/getting_started.md) for more information.
