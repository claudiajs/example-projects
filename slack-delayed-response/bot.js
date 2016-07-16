'use strict';

const promiseDelay = require('promise-delay');
const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const botBuilder = require('claudia-bot-builder');
const slackDelayedReply = botBuilder.slackDelayedReply;

const api = botBuilder((message, apiRequest) => {
  const seconds = parseInt(message.text, 10);
  if (Number.isInteger(seconds) && seconds > 0 && seconds < 61) {

	  // Invoke the same Lambda function asynchronously, and do not wait for the response
	  // this allows the initial request to end within three seconds, as requiured by Slack

    return new Promise((resolve, reject) => {
      lambda.invoke({
  			FunctionName: apiRequest.lambdaContext.functionName,
  			InvocationType: 'Event',
  			Payload: JSON.stringify({
          slackEvent: message // this will enable us to detect the event later and filter it
        }),
  			Qualifier: apiRequest.lambdaContext.functionVersion
  		}, (err, done) => {
        if (err) return reject(err);

        resolve();
      });
    })
      .then(() => {
        return { // the initial response
          text: `Ok, I'll ping you in ${seconds}s.`,
          response_type: 'in_channel'
        }
      })
      .catch(() => {
        return `Could not setup timer :(`
      });
  } else {
    return `Number of seconds needs to be between 1 and 60`
  }
});

// this will be executed before the normal routing.
// we detect if the event has a flag set by line 21,
// and if so, avoid normal procesing, running a delayed response instead

api.intercept((event) => {
  if (!event.slackEvent) // if this is a normal web request, let it run
    return event;

  const message = event.slackEvent;
  const seconds = parseInt(message.text, 10);

  return promiseDelay(seconds * 1000)
    .then(() => {
      return slackDelayedReply(message, {
        text: `${seconds} seconds passed.`,
        response_type: 'in_channel'
      })
    })
    .then(() => false); // prevent normal execution
});

module.exports = api;
