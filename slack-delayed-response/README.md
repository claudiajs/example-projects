# Slack bot with delayed response

Slack Slash commands are supporting delayed and multiple responses, you can respond to a command up to 5 times in 30 minutes.
_Claudia Bot Builder_ offers a simple solution for those delayed requests, check this simple example for more info and visit [Slack docs](https://api.slack.com/slash-commands#responding_to_a_command) for info about delayed responses.

<br/>
<img src="slack-delayed-response.gif" width="650" />
<br/>

## How to run it

This example requires _Claudia Bot Builder_ v1.4.0 or greater.

Run

```
npm run create
```

or

```
claudia create --api-module bot --region us-east-1 --timeout 120 --allow-recursion --configure-slack-slash-command
```

to create lambda and configure Slack Slash command.  
Keep in mind you need to increase timeout and to allow recursion, because lambda needs to call itself.

Then just run `/delay 10` slash command from your Slack.
