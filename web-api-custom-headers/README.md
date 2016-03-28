A simple example demonstrating how to use custom headers in API responses.

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS 
3. Check out the API ID in `claudia.json` (the previous step creates the file)
4. Open https://API_ID.execute-api.us-east-1.amazonaws.com/latest/hard-coded-headers in a browser (replace API_ID with the API ID from `claudia.json`) and inspect the headers. You should see an `X-Version` header with the value `101`, and `Content-Type` of `text/plain`

Check out [web.js](web.js) to see how the paths are set up. For more information, see the [Claudia Api Builder](https://github.com/claudiajs/claudia-api-builder) documentation.

