/*global exports, require */
var aws = require('aws-sdk'),
	got = require('got');
exports.handler = function (event, context) {
	'use strict';
	var SES = new aws.SES(),
		emailConfig = function (err) {
			return {
				Source: event.email.from,
				Destination: {
					ToAddresses: [event.email.to]
				},
				Message: {
					Subject: { Data: '[monitoring] ' + event.url},
					Body: { Text: { Data: 'Problem: ' + JSON.stringify(err)} }
				}
			};
		},
		start = Date.now();

	if (!event.email || !event.email.from || !event.email.to) {
		return context.fail('email not set up');
	}
	if (!event.url) {
		return context.fail('url not set up');
	}
	got(event.url, {retries: 0, timeout: (event.timeout || 2000)}).then(function () {
		context.succeed({success: event.url, time: (Date.now() - start)});
	}, function (e) {
		SES.sendEmail(emailConfig({code: e.statusCode || e.code, message: e.statusMessage}), context.done);
	});
};
