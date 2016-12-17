# Dynamic SVG labels with basic stats for GitHub repositories

This example project serves simple SVG labels using Lambda, such as the one below:

[![claudiajs/claudia](https://repolabels.net/claudiajs/claudia/large.svg)](https://github.com/claudiajs/claudia/)

See [repolabels.net](https://repolabels.net) for a live version of this example, and generate labels for your own repositories.

This example demonstrates how to:

- Bind method parameters to URL path components  (requests are processed as `{owner}/{repo}/{template}`)
- Customise response content types (this serves `image/svg+xml`)
- Manage development/testing/production API versions
- Connect to a third party REST API (github)
  - store keys for development/testing/production access 
- Protect API access using API keys
- reduce costs by caching results using CloudFront

## How it works

The code in [api.js](api.js) just connects to the GitHub developer API to retrieve repository statistics, and then
performs a simple string replacement on [SVG template files](svg/). The URL request format is:

```
https://<API ID>.execute-api.<REGION>.amazonaws.com/<STAGE>/<OWNER>/<NAME>/<TEMPLATE>.svg
```

where:

- `API ID` is the ID of your API (check the `claudia.json` file after deployment)
- `REGION` is the region where the API is deployed (eg `us-east-1` if you use the standard `package.json`)
- `STAGE` is the version of the API (eg `dev` or `production`, see the Getting Started section below for more info)
- `OWNER` is the owner of the GitHub repository you want to create a label for (eg `claudiajs`)
- `NAME` is the repository name (eg `claudia`)
- `TEMPLATE` is the name of a file from the [svg](svg) directory used to create the label (eg `large` or `small`)

## Getting started

Create the development version of the API using `npm run start`, and deploy the production version using `npm run release`. 

Github limits the rate of unauthenticated requests severely, this example allows you to optionally specify two stage variables to authenticate requests to GitHub, and increase rate limits.  Check out your deployed API in the AWS web console, and add two stage variables to the production stage - `githubClientId` and `githubSecret`.  [Create a GitHub applications](https://github.com/settings/applications/new) to get access keys. You can optionally also create a development GitHub application and store its keys in the development stage.

You can change the development version and run `npm run deploy`, and you will see that the development version changed, but the production version did not. For example, uncomment `apiKeyRequired: true` in the last line of `web.js` before deploying. This will cause the API calls to require an API key before allowing the request. See [Use an API Key in API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-api-keys.html) for more information on how to create an use an API key.

To push the currently released version to production, run `npm run release` again.
