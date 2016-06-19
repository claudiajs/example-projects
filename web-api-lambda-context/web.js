/*global require, console, module */
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

api.get('/', function (request) {
	'use strict';
	console.log(request);
	return request.lambdaContext;
});
