/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder(),
	Promise = require('bluebird'),
	superb = require('superb');
module.exports = api;
api.get('/hello', function () {
	'use strict';
	return 'hello world';
});
api.get('/echo', function (request) {
	'use strict';
	return request;
});
api.get('/greet', function (request) {
	'use strict';
	return Promise.resolve(request.queryString.name + ' is ' + superb());
});
