# Simple chat-bot example

This chat-bot shows how to receive and respond with simple text messages, using the same code for all four supported platforms. 

![](https://claudiajs.com/assets/supportbot-facebook.gif)
![](https://claudiajs.com/assets/supportbot-slack.gif)

## Try live

<a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands&client_id=50296596898.50276082452"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

* [Chat on Skype](https://join.skype.com/bot/08f53028-dd61-4769-907d-29bdce505f16)

* [Chat on Telegram](https://telegram.me/claudia-test-bot)

## Setting up your own copy

Use `npm run create` to set up the initial installation, then use:

* `npm run configure-slack` to set up Slack slash command configuration. Follow the instructions from [Slack API Docs](https://api.slack.com/) to set up an app with a slash command, then [Create a Slack Button](https://api.slack.com/docs/slack-button) so people can add your app to their channels 
* `npm run configure-facebook` to set up the Facebook messenger integration. Follow the instructions from the [Facebook Messenger Getting Started](https://developers.facebook.com/docs/messenger-platform/quickstart) guide, then submit the app for [App Review](https://developers.facebook.com/docs/messenger-platform/app-review) so the others can interact with it
* `npm run configure-skype` to set up Skype integration. Create an application and an application password at the [Microsoft App Portal](https://apps.dev.microsoft.com/Login?ru=https%3a%2f%2fapps.dev.microsoft.com%2f), and enter into Claudia when asked. Then create a bot at the [Skype Bot Developer Page](https://developer.microsoft.com/en-us/skype/bots/manage/Create), tick 'Send and receive messages and content in 1:1 chat', and enter the webhook URL printed by the Claudia installer
* `npm run configure-telegram` to set up the Telegram integration

## Privacy 

This bot collects no private information

## License and Terms of Service

[MIT](LICENSE) 
