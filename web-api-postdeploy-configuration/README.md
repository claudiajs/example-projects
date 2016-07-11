A simple example demonstrating how to use post-deploy configuration hooks:

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project; it will ask you to configure the message from the console during deployment
3. load the URL that the create command prints out -- you should see the message you configured 
4. run `npm run deploy` to update the lambda without changing the configuration
5. run `npm run configure` to update the lambda with a configuration value set in package.json
6. run `npm run configure-interactive` to update the configuration from the console during deployment

Check out [package.json](package.json) to see how the configuration parameter `custom-message` is passed to these steps, and check out [web.js](web.js), especially the line starting with `api.addPostDeployConfiguration` to see how the argument gets used to initialise stage variables.

