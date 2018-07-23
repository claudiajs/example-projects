/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	fs = require('fs'),
	superb = require('superb'),
	util = require('util');
module.exports = api;

// just return the result value for synchronous processing
api.get('/hello', function () {
	'use strict';
	return 'hello world';
});

// pass some arguments using the query string or headers to this
// method and see that they're all in the request object
api.get('/echo', function (request) {
	'use strict';
	return request;
});

// use request.queryString for query arguments
api.get('/greet', function (request) {
	'use strict';
	return request.queryString.name + ' is ' + superb.random();
});

// use {} for dynamic path parameters
api.get('/people/{name}', function (request) {
	'use strict';
	return request.pathParams.name + ' is ' + superb.random();
});

// Return a promise for async processing
api.get('/packagejson', function () {
	'use strict';
	var read = util.promisify(fs.readFile);
	return read('./package.json')
		.then(JSON.parse)
		.then(function (val) {
			return val;
		});
});

// use .post to handle a post; or .delete, .patch, .head, .put
api.post('/echo', function (request) {
	'use strict';
	return request;
});
