/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

api.get('/', function (request) {
	'use strict';
	if (!request.env.message) {
		return 'message is not configred. Run "npm run configure" to set it up';
	} else {
		return 'you configured ' + request.env.message;
	}

});

api.addPostDeployConfig('message', 'Enter a message:', 'custom-message');
