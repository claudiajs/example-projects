# Detecting context

This example shows how a lambda function can detect the alias it was called with. This is useful, for example, to load the correct configuration file when a single function runs for multiple versions, such as development, production or testing.

## Try it out

Install the dependencies using 

```bash
npm install
```

Then, set up the function using

```bash
npm run setup
```

This will also set up two aliases, `dev` and `production`, for the same function version. You can now invoke the development version using

```bash
npm run call-dev
```

Call the production version using:

```bash
npm run call-production
```

In both cases, you should see the output stating the function alias and the numeric version.

## Try this next

You can change the code and update the deployment, using

```bash
npm run deploy
```

this will re-assign both `dev` and `production` to a new version, so executing the call tests should show an increased numeric version as well. 

Alternatively, update only the development version, using

```bash
npm run deploy-dev
```

This should allow you to see different numeric versions for `dev` and `production` when executing the call tests.

