'use strict';
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = api;

api.post('/create-payment', request => {
	return stripe.charges.create({
		source: request.body.stripeToken,
		amount: request.body.amount,
		currency: request.body.currency,
		description: 'Stripe Charge Description'
	}).then(charge => {
		return { message: 'Payment Initiated!', charge: charge };
	}).catch((err) => {
		return { message: 'Payment Initialization Error', error: err };
	});
});
