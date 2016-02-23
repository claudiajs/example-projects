# Website Email Alert 

This Lambda service checks if a URL is available, and if not, sends an e-mail. Kind of like pingdom.

The project demonstrates how to integrate Lambda with [AWS Simple E-mail Service](https://aws.amazon.com/ses/).

## Prerequisites

If you have never used AWS SES before, you'll need to first verify the e-mail identity that will be used for sending notifications. Do so from your command line by executing

````
aws ses verify-email-identity --email-address EMAIL@DOMAIN 

````
You will also need to get out of the SES Sandbox to send to real e-mail addresses. For more info, check [Requesting Production Access to SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html).

SES service is specific to a region, so you might want to change the active region in the NPM `start` script section of `package.json`.

## Try it out

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS 
3. edit the [test.json](test.json) file and set up the e-mail accounts, as well as the URL you want to check
4. run `npm test` to execute the function manually using the test event

Try it out for some existing or non-existing URLs, to see the effect. Then set it up as a scheduled event on AWS so it runs automatically.

## How it works

Check out the [package.json](package.json) scripts section to see how Claudia gets invoked for the `start` and `test` scripts. Check out the [main.js](main.js) file to see how the Lambda function works.
