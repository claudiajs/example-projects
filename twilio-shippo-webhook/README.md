# Using AWS' Lambda & API Gateway to Send SMS Tracking Updates with Shippo & Twilio

To get started and provide a little context, we’re going to go through how to create an AWS Lambda function that will trigger whenever Shippo posts to our AWS API Gateway Endpoint. Inside of the Lambda function, we’re going to call out to Twilio to send an SMS update with our tracking info provided by Shippo’s webhook.

Now, I know what you’re thinking, this sounds pretty complicated and requires a lot of manual set up and repeated uploading of JavaScript files to AWS, but you’d be wrong. We’re going to use ClaudiaJS to do a lot of the heavy lifting on this for us, because I’m all about writing less code to do more.

Things you'll want before getting started with this tutorial:

* [Twilio Account](https://www.twilio.com/try-twilio)

> You'll need your Account SID and Auth Token from this (you can find these both in your dash after signing up)

* [Shippo Account](https://goshippo.com/register)

> You just need to plug in your API endpoint URL to the [webhooks](https://goshippo.com/docs/webhooks) area to have it work.

You can get ClaudiaJS by just installing it globally on your machine using:

`npm install -g claudia`

Claudia is going to need access to your AWS account, so there is a detailed guide [here](https://claudiajs.com/tutorials/installing.html) that goes into how to setup access credentials for ClaudiaJS on your machine to create Lamda functions and API endpoints. You need to make sure to give access for [`AWSLambdaFullAccess`](https://console.aws.amazon.com/iam/home?region=us-east-1#policies/arn:aws:iam::aws:policy/AWSLambdaFullAccess), [`IAMFullAccess`](https://console.aws.amazon.com/iam/home?region=us-east-1#policies/arn:aws:iam::aws:policy/IAMFullAccess), and [`AmazonAPIGatewayAdministrator`](https://console.aws.amazon.com/iam/home?region=us-east-1#policies/arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator).

We can create our project folder using (you can skip this if you simply cloned the repo):

`mkdir twilio-shippo && cd twilio-shippo`

You can speed up initializing your project using the following command, which generates a `package.json` for you:

`npm init --yes`

Now that we have our `package.json` created, we can start installing some dependencies we'll need for our function to work. We'll be needing ClaudiaJS' API Builder and Twilio's node library to get up and running here.

`npm install -S twilio claudia-api-builder`

Our end goal here is to get something like what we have at [app.js](/app.js) in the repo. Feel free to just copy and modify from there or work through this with us. Just don't forget to use the correct commands when deploying with ClaudiaJS.

You'll want to create an app file `app.js` where you'll be building out your lambda function along with specifying how your API endpoint will work.

We'll start by adding our function dependencies at the top of our file:
```javascript
var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    twilio = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
```

From here, we want to create the endpoint that we'll be putting into [Shippo's webhook](https://goshippo.com/docs/webhooks) interface for capturing all of our tracking updates. Every time Shippo detects a new update to the status of a tracking number that we have POSTed to them, Shippo will send out updates to our API endpoint that we give to them.

We'll want to be sure that we export our function so that Claudia can package everything up to be deployed to AWS for us. We can do this by adding the following to our `app.js` file:
```javascript
// Reminder: This should be appended below the code found above
module.exports = api;

api.post('sms-updates', function(req){
    // Our Lambda logic will go here
});
```

We are creating a POST endpoint, since Shippo will be POSTing the our tracking updates to us. We'll then parse the data to relay over to Twilio to send out our SMS messages.

First, lets parse the body of the message that Shippo has sent to us. We'll set up a few variable to prevent repeating ourselves, and we'll add some logic in there to handle if there is no location provided with our tracking update.

```javascript
api.post('/sms-updates', function(req) {
  var body = req.body,
      trackingStatus = body.tracking_status,
      trackingLocation = '';

  if (trackingStatus.location) {
    if (trackingStatus.location.city) {
      trackingLocation = trackingStatus.location.city + ', ' |
          trackingStatus.location.state
    }
  } else {
    trackingLocation = 'UNKNOWN';
  }

  return; // Don't worry, we'll actually be returning something here later
});
```
Now that we have our logic built for handling the body of the response and safely handle when we don't get a location with our tracking status, we can dig into sending a formatted SMS using Twilio.

The basic format for sending Twilio messages requires we have a destination number (for sending our SMS to), our Twilio number that we're sending from, and a message to send (duh!).

Here is what it looks like once we add sending our message:
```javascript
api.post('/sms-updates', function(req) {
  var body = req.body,
      trackingStatus = body.tracking_status,
      trackingLocation = '';

  if (trackingStatus.location) {
    if (trackingStatus.location.city) {
      trackingLocation = trackingStatus.location.city + ', ' |
          trackingStatus.location.state
    }
  } else {
    trackingLocation = 'UNKNOWN';
  }

  return twilio
      .sendMessage({
        to: '+1-TEST_NUMBER',     // This should be your destination number
        from: '+1-TWILIO_NUMBER', // This is your Twilio number in your account
        body: 'Tracking #: ' + body.tracking_number + // Here's our message
              '\nStatus: ' + trackingStatus.status +
              '\nLocation: ' + trackingLocation
      })
      .then(function(success) {  
        // We are using a promise here to help Claudiajs
        // make sure the request finishes executing, otherwise
        // our function will exit before it we're successfully send our
        // request
        console.log(success);
      })
      .catch(function(error) {
        console.log(error);
      });
});
```

One thing to note about the above code, is that we're using a Promise to resolve the function. This is done because ClaudiaJS will look for whether you're using a Promise in your Lambda function and be sure to let it continue running until the Promise resolves (or your function times out, which is around 3 seconds by default in AWS).

Now that we have a composed Lambda function and Gateway endpoint, we can deploy this all to AWS using our ClaudiaJS CLI tool. If you setup your AWS Credentials at ``~/.aws/credentials` (as specified at [https://claudiajs.com/tutorials/installing.html](https://claudiajs.com/tutorials/installing.html)), You can just use the following command:

`claudia create --name twilio-shippo --region us-west-2 --api-module app --profile claudia`

You can see the format folows the format:

`claudia create --name NAME_OF_APP --region AWS_REGION --api-module FILENAME --profile AWS_CREDENTIALS_PROFILE`

There are some useful scripts in the [`package.json`](/package.json) named `"create"` and `"update"` that can be useful when you're crafting your Lambda function.

Once we have that successfully deployed, we can plug our API Gateway endpoint link into Shippo to start having our tracking updates send out. We'll see our link printed out to the terminal under `"url"`. That is the link we'll be pasting into Shippo.

```json
{
  "lambda": {
    "role": "twilio-shippo-executor",
    "name": "twilio-shippo",
    "region": "us-west-2"
  },
  "api": {
    "id": "YOUR_UNIQUE_ID",
    "module": "app",
    "url": "https://YOUR_UNIQUE_ID.execute-api.us-west-2.amazonaws.com/latest"
  }
}
```

Navigate to [https://app.goshippo.com/api](https://app.goshippo.com/api) and scroll down to Webhooks to click **+ Add Webhook**. Since we had our route go to `sms-updates` we'll want to append that to our `url` so that the updates post to the right place.

This would give us something like:

`https://YOUR_UNIQUE_ID.execute-api.us-west-2.amazonaws.com/latest/sms-updates`

After pasting this into the URL field in Shippo, make sure that the dropdown under Event Type is set to tracking and click the green checkbox to save it. Now we can test the function by clicking on test on the far right. If everything goes well, you should receive an SMS with tracking information at the number you had in the `to` field of your Twilio sendMessage object.

Now you can get SMS updates for all numbers that you post to Shippo automatically without having to provision any servers, and you only pay when you are receiving updates using Lambda and API Gateway with AWS. You could even take it a step further and include phone numbers for SMS updates in the `metadata` field when POSTing to Shippo and parse that out to dynamically send SMS updates to customers.

You can find out most information about Shippo and how to use our API to improve your shipping experience at [https://goshippo.com/docs](https://goshippo.com/docs). We're looking forward to seeing what you can build with our API.
