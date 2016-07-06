# Slack Slash command with delay

A simple example project that demonstrates how Claudia bot builder can do a delayed response for Slack slash command.

To try it out, do following:

1. install the dependencies using `npm install`
2. create the function using `npm run create`
3. run `npm run configure-slack` and follow the instructions to configure Slack slash command
4. after finalizing the setup run `/delay test` command in Slack and you should see immediate response and delayed response after 5 seconds

Check out [package.json](package.json) to see how the Lambda is created using the `create` script, and [bot.js](bot.js) to see how bot builder works for delayed responses. 
