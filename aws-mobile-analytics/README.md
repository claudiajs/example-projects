# Using AWS Mobile Analytics for server-side events

This example is in progress, not production-quality yet, as the service is not well documented so there is a fair bit of development by poking.

## Prerequisites

* create a mobile analytics APP ID in the [AWS Mobile Analytics Console](https://console.aws.amazon.com/mobileanalytics)
* deploy and configure the app using `npm run start` and provide the APP Id when asked


## References

* [PutEvents REST API](http://docs.aws.amazon.com/mobileanalytics/latest/ug/PutEvents.html)
* [Mobile Analytics Client](https://github.com/aws/aws-sdk-mobile-analytics-js/blob/master/lib/MobileAnalyticsClient.js)
* [putEvents](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MobileAnalytics.html#putEvents-property)
