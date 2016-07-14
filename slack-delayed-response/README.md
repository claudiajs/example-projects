# Slack bot with delayed response

This example project shows how to work implement delayed responses to Slack slash commands. Slack limits the time to the first response to 3 seconds, so if you're trying to run a longer task, implementing everything in a single response won't work. 

Slack Slash commands support delayed and multiple responses, allowing a bot to respond to a command up to 5 times in 30 minutes.

_Claudia Bot Builder_, since 1.4.0, offers a simple solution for delayed responses. This project demonstrates how to do that by implementing a simple alert timer. You can tell it how many seconds to wait, and it will ping you after that period.

## How to run it

1. Run `npm install` to grab all the dependencies
2. Run `npm run create` to set up a Lambda function, and follow the instructions to connect it to Slack. (Refer to [Setting up a Slack Slash Command](https://github.com/claudiajs/claudia-bot-builder/blob/master/docs/GETTING_STARTED.md#slack-app-slash-command-configuration) if you need more info)
3. In your Slack channel, Run `/delay 10` 


You'll see an immediate response that the timer is scheduled, and a delayed response 10 seconds later.

<br/>
<img src="slack-delayed-response.gif" width="650" />
<br/>

## How it works

The code is in [bot.js](bot.js).

### Responding to the primary request

To provide Slack users an immediate response, the bot will reply to the primary request with a confirmation message. It will also trigger an asynchronous call to the same Lambda function, without waiting for the response, and pass the original message. For that, we use the AWS SDK, and the `Event` Lambda invocation type.

### Executing a delayed response

The second piece of the puzzle is setting up an event intercept function. Claudia API Builder (which the Bot Builder uses) allows you to intercept events and prevent the normal execution. This bot sets up an event intercept, that checks if the current event is coming from the Web API (so from Slack) or from a previous function invocation, by looking for the `slackEvent` flag. If it does not detect the flag, the intercept function just returns the original request and lets it run normally. If it detects the `slackEvent` flag, it executes a secondary delayed response, and resolves the promise with `false`, to prevent normal request execution.

`botBuilder.slackDelayedReply` is a useful utility function that implements the Slack protocol for delayed replies. 

### Configuring the Lambda function

The `create` script in [package.json](package.json) sets up two important arguments:

* `--timeout` allows the Lambda to run for longer than the default 3 second timeout. In this case, the maximum allowed time will be 120 seconds
* `--allow-recursion` sets up the IAM permissions so that the Lambda can call itself, to cause a delayed response

## More information

Check out the [Slack API Docs](https://api.slack.com/slash-commands#responding_to_a_command) for more information on delayed responses, and Claudia API Builder [API Docs](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#intercepting-requests) for more information on intercepting requests.

