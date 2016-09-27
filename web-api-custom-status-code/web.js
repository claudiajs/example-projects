/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	Promise = require('bluebird');
module.exports = api;

// set headers as key-value pairs using the success.headers property */
api.get('/status-code', function () {
	'use strict';
	return 'OK';
}, {success: 201 });

api.get('/error-code', function () {
	'use strict';
	throw 'Abort';
}, {error: 404});

// or use dynamic codes returning new api.ApiResponse(content, headers)
api.get('/programmatic-codes', function () {
	'use strict';
	return new api.ApiResponse('OK', {'Content-Type': 'text/plain'}, 202);
});

// dynamic headers also work with promises, just resolve with new api.ApiResponse

api.get('/programmatic-codes-promise', function () {
	'use strict';
	return Promise.delay(100).then(function () {
		return new api.ApiResponse('OK', {'X-Version': '303', 'Content-Type': 'text/plain'}, 400);
	});
});

