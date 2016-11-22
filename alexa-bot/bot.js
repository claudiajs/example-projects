/*global require, module */
const botBuilder = require('claudia-bot-builder');

const api = botBuilder(
	function (message /*, originalRequest*/) {
		'use strict';
		if (message.text) {
			return message.text + ' is spelled ' + message.text.toUpperCase().split('').join(' ');
		} else {
			return 'Say spell and give me a word to spell';
		}
	},
	{ platforms: ['alexa'] }
);

module.exports = api;
