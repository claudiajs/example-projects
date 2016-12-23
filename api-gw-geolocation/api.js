/*global module, require */
var API = require('claudia-api-builder'),
	api = new API();

api.get('/', function (request) {
	'use strict';
	return {
		IP: request.context.sourceIp,
		Country: request.headers['CloudFront-Viewer-Country']
	};
});

module.exports = api;
