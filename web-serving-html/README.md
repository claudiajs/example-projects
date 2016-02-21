An example demonstrating how to customise success/error response codes and content types in a Web API connected to a Lambda function with Node.js and 
Claudia.js. This example will serve HTML pages instead of the default `application/json` response type, and it changes error code to 403, instead of the default 500. Finally, the search box redirects to Github using a 302 response code.

To try it out, first [set up the credentials](https://github.com/claudiajs/claudia/blob/master/getting_started.md#configuring-access-credentials), then:

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS 
3. Check out the API ID in `claudia.json` (the previous step creates the file)
4. Open https://API_ID.execute-api.us-east-1.amazonaws.com/latest/start.html in a browser (replace API_ID with the API ID from `claudia.json`)

Check out [web.js](web.js) to see how the paths are set up. For more information, see the [Claudia Api Builder](https://github.com/claudiajs/claudia-api-builder) documentation.
