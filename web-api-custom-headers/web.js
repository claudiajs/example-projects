/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	Promise = require('bluebird');
module.exports = api;

// set headers as key-value pairs using the success.headers property */
api.get('/hard-coded-headers', function () {
	'use strict';
	return {a: 'b'};
}, {success: {headers: {'X-Version': '101', 'Content-Type': 'text/plain'}}});

// or use dynamic headers by enumerating them as an array, then returning new api.ApiResponse(content, headers)
api.get('/programmatic-headers', function () {
	'use strict';
	return new api.ApiResponse('OK', {'X-Version': '202', 'Content-Type': 'text/plain'});
}, {success: {headers: ['X-Version', 'Content-Type']}});

// dynamic headers also work with promises, just resolve with new api.ApiResponse

api.get('/programmatic-headers-promise', function () {
	'use strict';
	return Promise.delay(100).then(function () {
		return new api.ApiResponse('OK', {'X-Version': '303', 'Content-Type': 'text/plain'});
	});
}, {success: {headers: ['X-Version', 'Content-Type']}});

// error handlers can only use hard-coded header values, dynamic headers are not supported

api.get('/error-headers', function () {
	'use strict';
	throw 'Abort';
}, {error: {headers: {'X-Version': '404'}}});

