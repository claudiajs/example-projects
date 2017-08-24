# Universal React and serverless express with claudiajs

## What is this

This app is a combination of universal-create-react-app and aws-serverless-express as created from codestar, and it uses claudiajs to deploy the code changes to lambda. After weeks of trial and error, claudiajs helped me to fix a multitude of issues that I had with codestar, codebuild, and codecommit.

Please meet Claudiajs and appreciate the greatness.

## How to start
1. https://claudiajs.com/tutorials/installing.html
2. npm install
3. Deploy a sample function with `npm run deploy-dev --profile $YOUR_AWS_PROFILE_NAME --name HelloWorldFunctionTest`
4. You will get some output with a url to your function, as described here https://claudiajs.com/tutorials/hello-world-api-gateway.html#deploying-to-aws, and you should CMD/CTRL + Click on it.
5. You should see the universal create react app landing page.

## How to test locally
You should be able to follow the universal-create-react-app instructions. Please submit a PR or issue if you have trouble.

## How to deploy
Deploy to prod with `npm run deploy-prod --profile $YOUR_AWS_PROFILE_NAME --name $YOUR_FUNCTION_NAME`
Deploy to dev with `npm run deploy-dev --profile $YOUR_AWS_PROFILE_NAME --name $YOUR_FUNCTION_NAME`

## How to do other things
Check out the documentation for claudiajs, universal-react-app, aws-serverless-express, and expressjs.

## Other notes

### Why steal universal-react-app readme?
The readme from universal create react app is below (instead of simply being linked) so that you can read exactly how this was supposed to be used from the code that existed when this package was built.

### Whatsup with hot-reloading?
I don't know. Hot reloading is a little bit slow because it has to compile first and there are a few other weird things I didn't care to take the time to fix. I don't know if I broke it or universal-create-react-app had it already partially sketchy.. but there is something wrong there and I would appreciate anyone who can fix it wherever the root cause is!

### Not all of my assets are loading..
Yea... so, because of the production/development --version flag to claudiajs, the generated URL at first has some problems with the mappings. You can fix this by uncommenting the line in the config passed to ManifestPlugin. You will need to add logic to determine the appropriate production/development prefix. However, when you use API gateway and add a custom domain name, this issue is non-existent, so I didn't want to commit code that broke the usecase that is probably more common.


## Universal Create React App

This project is a refactoring of the default app created by [create-react-app v1.0.7](https://github.com/facebookincubator/create-react-app/tree/v1.0.7), and then ejected.

A universal app runs both on the server and the client, and shares as much code as possible between the server and client - typically around 90%.

Development

![](https://gifyu.com/images/universal-dev.gif)

Production

![](https://gifyu.com/images/universal-build.gif)

For a step by step explanation read the article
https://medium.com/leanjs/universal-create-react-app-step-by-step-b80ba68d125d

### How to run this project

- `yarn install`
- `yarn start` to run it in development
- `npm run build` to build the production bundle. You must build the production bundle before running the production bundle.
- `npm run serve` to run the production bundle.
- You can disable JavaScript on your browser, and use the app to test that the app is functional.
- With JavaScript enabled and running the app in development mode (`yarn start`), you can test the CSS hot reloading by changing this file /src/client/index.css

### Explanation

The source code (src) is split in 3 folders:
- client. This is code that runs just on the browser.
- server. This is code that runs just on the server.
- shared. This is code that runs both on the server and on the client

The server is implemented using [Express](http://expressjs.com/)

There are two build scripts. One to build the JavaScript bundle that will be sent to the client. By default from the same server but you could serve it via a CDN or anywhere else. The other build script builds the JavaScript bundle that runs on the server.
- /scripts/build-client.js
- /scripts/build-server.js

The start script will try to run the client (Webpack Dev Server) on a given port (3000 by default). If the port is not available it will try to find another port. We have implemented the same on the port used to run the server. The start script will try to run the server (Express compiled with Webpack) on a given port (5678 by default). If the port is not available it will try to find another port.

For a step by step explanation read the article
https://medium.com/leanjs/universal-create-react-app-step-by-step-b80ba68d125d

### Features

All the features that you have in create-react-app are included in this project, plus react-router v4.

- `yarn start` will start two servers. The first one (Webpack Dev Server), to build and serve the JavaScript bundle to the client. The Second one (Express), to render the app on the server.
- CSS Hot reloading is enabled. You'll notice a quick adjustment to the layout in development mode when you start the app. This is because while in development env the CSS is served via the Webpack Hot Module Replacement. So the app is rendered without CSS from the server, and then on the client it is injected when the JavaScript is run. If you run the app in production mode by executing `npm run serve` (note, you must first build the production bundle by executing `npm run build`), the CSS will be displayed from the beginning. The reason for this is that we don't hot replace the CSS in production.
- "Page Not found" with a 404 status on the server-side without defining any route on the server.

### Acknowledgments

[Apollo GitHunt-React example](https://github.com/apollographql/GitHunt-React) was a great source of inspiration for finding solutions.

### README generated by create-react-app v1.0.7

You can read here the original README.md generated by create-react-app in this repo https://github.com/facebookincubator/create-react-app/blob/v1.0.7/packages/react-scripts/template/README.md
