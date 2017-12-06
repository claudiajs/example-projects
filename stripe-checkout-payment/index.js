'use strict';

const fs = require('fs');
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = api;

api.get('/', () => {
	return new Promise((resolve, reject) => {
		fs.readFile('index.html', 'utf8', (err, file) => {
			if (err) throw err;
			resolve(file);
		});
	});
}, { success: { contentType: 'text/html'}});

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
