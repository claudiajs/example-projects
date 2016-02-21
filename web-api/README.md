A simple example demonstrating how to create and configure a Web REST API connected to a Lambda function with Node.js and Claudia.js. To try it out, first [set up the credentials](https://github.com/claudiajs/claudia/blob/master/getting_started.md#configuring-access-credentials), then:

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS 
3. Check out the API ID in `claudia.json` (the previous step creates the file)
4. Open https://API_ID.execute-api.us-east-1.amazonaws.com/latest/greet?name=Mike in a browser (replace API_ID with the API ID from `claudia.json`)

Check out [web.js](web.js) to see how the paths are set up. For more information, see the [Claudia Api Builder](https://github.com/claudiajs/claudia-api-builder) documentation.

When a version is not provided for the create or update command (as in this case, check out the [package.json](package.json) scripts section), Claudia will automatically create a stage called `latest` for the API, and deploy that using the `$LATEST` Lambda function version. That's where the `/latest/` part of the URL comes from. If a version is provided with the deployment, then an API gateway stage will be created for that name, and connected to the appropriate Lambda version alias. This makes it easy to run several Lambda and API versions at the same time, for development, testing, production etc.

Claudia assigns a generic input processing template to all requests, that just dumps all the available parameters (headers, query string and stage variables) into a JSON object, available to your request handler. You can see the entire request object passed from Api Gateway to Lambda using the /echo path (https://API_ID.execute-api.us-east-1.amazonaws.com/latest/echo?name=Mike).


