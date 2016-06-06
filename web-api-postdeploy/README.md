A simple example demonstrating how to use post-deploy hooks:

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS
3. load the URL that the create command prints out -- you should see `from-create`
4. run `npm run deploy` to update the lambda with a different configuration in a post-deploy step
5. load the URL again, you should see `from-update`


Check out [package.json](package.json) to see how the configuration parameter `custom-message` is passed to these steps, and check out [web.js](web.js), especially the like starting with `api.addPostDeployStep` to see how the argument gets used to initialise stage variables.

