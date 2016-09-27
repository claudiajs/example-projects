/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();
module.exports = api;


api.any('/echo', function (request) {
	'use strict';
	return request;
});

api.get('/dynamic/{proxy+}', function (request) {
	'use strict';
	return 'You called ' + request.pathParams.proxy;
}, { success: { contentType: 'text/plain'}});
