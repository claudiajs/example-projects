# Intercepting Web requests

Claudia API Builder allows you to intercept web API requests, filter and change them before routing. This example demonstrates how to set up a simple intercept
that kills all requests without a query string name parameter.

## To try it out

* run `npm start` to install the app
* try the API `/hello` URL in your browser, it should report an error 
* add `?name=Tom` to the URL and try again, you should see a successful greeting.

## How it works

The `intercept` method gets called before the routing, and can prevent the requests from being executed by throwing an exception, or returning a promise that later rejects. See [web.js](web.js) for how it's set up in this case, and check out [Intercepting Requests](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#intercepting-requests) API docs for more information 
