# Deploying Proxy APIs easily

Since September 2017, API Gateway supports proxying requests to Lambda without having to set up specific handlers, methods or conversion templates. This can be a good alternative to using Claudia API Builder if you need to set up something more generic. Claudia 2.0 can automatically deploy a proxy API for your Lambda function -- just add `--deploy-proxy-api` when creating it.  

To try out this example, use:

1. `npm install` to grab the dependencies
2. `npm start` to deploy the [api.js](api.js) to Lambda and create a proxy api

The procedure will print out a URL. You can send HTTP requests to it, and any sub-URLs, and get back the full request object as the response.

For more information on this feature, check out [Build an API Gateway API Using Proxy Integration and a Proxy Resource](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy.html ) from AWS documentation.
