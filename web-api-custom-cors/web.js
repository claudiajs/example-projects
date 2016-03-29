/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();
module.exports = api;

// override default access-control-allow-headers

api.corsHeaders('Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Api-Version');

/* define a global function that returns an allowed cors origin. this will be used for the OPTIONS access-control-allow-origin response header */
api.corsOrigin(function (request) {
	'use strict';
	if (/claudiajs.com$/.test(request.headers.Origin)) {
		return request.headers.Origin;
	}
	return '';
});

// cors headers will automatically be added to all requests

api.get('/echo', function (request) {
	'use strict';
	return request;
});

// you can customise individual responses as well

api.get('/programmatic-headers', function () {
	'use strict';
	return new api.ApiResponse('OK', {'Access-Control-Allow-Origin': 'https://www.claudiajs.com'});
}, {success: {headers: ['Access-Control-Allow-Origin']}});

