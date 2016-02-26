/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	Promise = require('bluebird'),
	superb = require('superb');
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

// use a promise for asynchronous processing
api.get('/greet', function (request) {
	'use strict';
	return Promise.resolve(request.queryString.name + ' is ' + superb());
});

// use {} for dynamic path parameters
api.get('/people/{name}', function (request) {
	'use strict';
	return 'You wanted ' + request.pathParams.name;
});

// use .post to handle a post; or .delete, .patch, .head, .put
api.post('/echo', function (request) {
	'use strict';
	return request;
});
