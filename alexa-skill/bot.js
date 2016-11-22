/*global require, module, console */
const botBuilder = require('claudia-bot-builder'),
	  getIntentName = function (alexaPayload) {
		  'use strict';
		  return alexaPayload &&
			  alexaPayload.request &&
			  alexaPayload.request.type === 'IntentRequest' &&
			  alexaPayload.request.intent &&
			  alexaPayload.request.intent.name;
	  };
const api = botBuilder(
	function (message, originalRequest) {
		'use strict';
		console.log(originalRequest.body);
		// message.text has all intent placeholders joined together, for quick access
		if (message.text) {
			 // just return a text message to have it automatically packaged
			 // as a PlainText Alexa response, continuing the session
			 return 'Spelling bee says ' + message.text + ' is spelled ' + message.text.toUpperCase().split('').join('. ') + '.';
		// you can use all the Alexa request properties from originalRequest.body
		} else if (getIntentName(originalRequest.body) === 'ExitApp'){
			// return a JavaScript object to set advanced response params
			// this prevents any packaging from bot builder and is just
			// returned to Alexa as you specify
			return {
				response: {
					outputSpeech: {
						type: 'PlainText',
						text: 'Bye from Spelling Bee!'
					},
					shouldEndSession: true
				}
			};
		} else {
			return {};
		}
	},
	{ platforms: ['alexa'] }
);

module.exports = api;
