'use strict';

const botBuilder = require('claudia-bot-builder');
const excuse = require('huh');

module.exports = botBuilder(request =>
  `Thank you for sending ${request.text}. Your message is very important to us. The problem was caused by ${excuse.get()}`
);
