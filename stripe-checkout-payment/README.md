# Stripe Checkout Payment Serverless API

This simple example shows how to implement a Stripe Checkout to create charge serverless function with AWS Lambda, and charge your users credit cards.

Stripe allows your application to create and execute payments.

## NOTE!
You need to have proper a front-end implementation. A very basic, simple example implementation in vanilla JavaScript (no frameworks) has been provided. In case you're copying the code, the HTML file **MUST** be removed before your serverless function deployment.

## Prerequisites

1. Create a Stripe account
2. Set your AWS credentials locally
3. Replace with your Stripe secret key variable STRIPE_SECRET_KEY value in the `package.json` `create` script.
4. Setup a frontend site to send data in the format expected by the service (stripeToken, amount, currency)

## How to run it

1. Run `npm install` to grab all the dependencies
2. Run `npm run create` to set up a Lambda function with the `STRIPE_SECRET_KEY` environment variable.
2. Run `npm run update` to update your Lambda function if needed.


That's it.

## How does it work

The code is in the [index.js](index.js).

The frontend part is in the [index-REMOVE-BEFORE-UPLOADING-TO-LAMBDA.html](index-REMOVE-BEFORE-UPLOADING-TO-LAMBDA.html). It **MUST** be removed before deploying your serverless payment Stripe function.

1. Type in the amount you want to charge, and click pay.
2. Type in a test card (4111 1111 1111 1111, EXP: 11/19, CCV: 1111, ZIP: 111111) and your email and click pay.
3. The request is sent to Stripe - Stripe verifies, handles the data and gives your application the Stripe Token, valid for a few minutes to initiate a charge.
4. Your frontend application then needs to pack the stripe ID along with the same amount (but in cents) and make a request to your Lambda function on the `/create-payment` endpoint.
5. Your serverless Lambda function received the data and makes a Stripe charge and returns a response or an error to your frontend app.
6. That's it!


## More information

Check out the [Stripe Checkout Docs](https://stripe.com/docs/checkout) for more information on Stripe Checkout.
