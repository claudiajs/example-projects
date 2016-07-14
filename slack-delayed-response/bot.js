'use strict';

const rp = require('minimal-request-promise');
const promiseDelay = require('promise-delay');
const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const botBuilder = require('claudia-bot-builder');
const slackDelayedReply = botBuilder.slackDelayedReply;

const api = botBuilder((message, apiRequest) => {
  const seconds = parseInt(message.text, 10);
  if (Number.isInteger(seconds) && seconds > 0 && seconds < 61) {
    return new Promise((resolve, reject) => {
      lambda.invoke({
  			FunctionName: apiRequest.lambdaContext.functionName,
  			InvocationType: 'Event',
  			Payload: JSON.stringify({
          slackEvent: message
        }),
  			Qualifier: apiRequest.lambdaContext.functionVersion
  		}, (err, done) => {
        if (err) return reject(err);

        resolve();
      });
    })
      .then(() => {
        return {
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

api.intercept((event) => {
  if (!event.slackEvent)
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
    .then(() => false);
});

module.exports = api;
