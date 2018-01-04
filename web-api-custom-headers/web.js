/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();
module.exports = api;

// set headers as key-value pairs using the success.headers property */
api.get('/hard-coded-headers', function () {
	'use strict';
	return {a: 'b'};
}, {success: {headers: {'X-Version': '101', 'Content-Type': 'text/plain'}}});

api.get('/error-headers', function () {
	'use strict';
	throw 'Abort';
}, {error: {headers: {'X-Version': '404'}}});

// or use dynamic headers by returning new api.ApiResponse(content, headers)
api.get('/programmatic-headers', function () {
	'use strict';
	return new api.ApiResponse('OK', {'X-Version': '202', 'Content-Type': 'text/plain'});
});

// dynamic headers also work with promises, just resolve with new api.ApiResponse

api.get('/programmatic-headers-promise', function () {
	'use strict';
	return Promise.resolve().then(function () {
		return new api.ApiResponse('OK', {'X-Version': '303', 'Content-Type': 'text/plain'});
	});
});

// dynamic headers overwrite default headers,

api.get('/dynamic-over-static', function () {
	'use strict';
	return new api.ApiResponse('OK', {'X-Version': '303', 'Content-Type': 'text/plain'});
}, {success: {headers: {'X-Version': 101, 'Y-Version': 202}}});

