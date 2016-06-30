# Using AWS Mobile Analytics for server-side events

This example demonstrates how to use [Amazon Mobile Analytics](https://console.aws.amazon.com/mobileanalytics) to collect internal telemetry for Lambda execution. Lambda
and API Gateway already support great external telemetry using CloudWatch, but if you want to trigger events and have a nice dashboard about what happens inside a Lambda function, relying on CloudWatch alone is not good.

Amazon Mobile Analytics is a relatively nice event-logging solution that can aggregate sessions, report on various event parameters and aggregate metrics. 

## Prerequisites

* create a mobile analytics APP ID in the [AWS Mobile Analytics Console](https://console.aws.amazon.com/mobileanalytics)
* deploy and configure the app using `npm run start` and provide the APP Id when asked

## Using the app

After the initial deployment, Claudia will log the API URL. Open that in a browser and it will log an anonymous event. Add `?name=Tom` to the URL, and it will log an event for `Tom`. About one hour later, check your Amazon Mobile Analytics console, you should see those events in the 'Custom Events' tab.

## How it works

The utility logging function is in [`eventlogger.js`](eventlogger.js). It connects to AMA and pre-populates most of the fields with the Lambda execution information. You can modify this to create session events, or payment events &ndash; check out the event structure reference below.

The main module is [api.js](api.js), which just logs a simple event and demonstrates how to pass in additional event parameters and metrics. In this case, it logs the query string parameter name, and the length of the name as the metric. It uses a stage variable to store the application ID, and asks the users to configure it in a post-deploy step. 

When using this example in your code, remember to copy the policy file from the [policies](policies) directory, and provide to Claudia when creating the function, so that your Lambda function gets authorised to log events. 

## References

* [PutEvents REST API](http://docs.aws.amazon.com/mobileanalytics/latest/ug/PutEvents.html)
* [Mobile Analytics Client](https://github.com/aws/aws-sdk-mobile-analytics-js/blob/master/lib/MobileAnalyticsClient.js)
* [putEvents](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MobileAnalytics.html#putEvents-property)
