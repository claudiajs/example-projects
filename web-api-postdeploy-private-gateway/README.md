An example of a private API gateway configured to work on an AWS VPC:

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS
3. load the URL that the create command prints out -- you should see `Hello from your Private API`


Check out [package.json](package.json) to see the configuration for the security groups and VPCEs.

`Troubleshooting:`
If after deploying your gateway you can't appear to access or resolve it, ensure that you are able to resolve URL's on the private DNS.

**[Private API Considerations](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html#apigateway-private-api-design-considerations)**


