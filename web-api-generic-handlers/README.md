A simple example demonstrating how to create generic handlers with Claudia API Builder. Since September 2016, API Gateway allows you to set up a wildcard path matcher using `{proxy+}`, and set up a single handler for all supported HTTP methods using the `ANY` method. With Claudia API Builder, since version 2.0, you can use both those features directly.

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS. It will print a URL. 
3. Open the `URL + '/echo'` in a browser to see the generic response, post to it, or invoke it with some other HTTP method using curl.
4. Open the `URL + '/dynamic/' + any path` to see how dynamic paths are parsed

Check out [web.js](web.js) to see how the paths are set up. For more information, see the [Claudia Api Builder](https://github.com/claudiajs/claudia-api-builder) documentation.

