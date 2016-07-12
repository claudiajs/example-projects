/*global require, module */
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

api.get('/hello', function (request) {
	'use strict';
	return 'Hello ' + request.queryString.name;
});

api.get('/ping', function (request) {
	'use strict';
	return 'Pinging ' + request.queryString.name;
});

api.intercept(function (request) {
	'use strict';
	if (!request.queryString.name) {
		throw 'You must provide a name';
	} else {
		return request;
	}
});
