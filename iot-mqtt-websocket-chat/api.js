/*global require, module, __dirname */
var fs = require('fs'),
	path = require('path'),
	denodeify = require('denodeify'),
	readFile = denodeify(fs.readFile),
	signUrl = require('aws-device-gateway-signed-url'),
	API = require('claudia-api-builder'),
	api = new API();

module.exports = api;

api.post('endpoint-url', function (request) {
	'use strict';
	var expiry = 86400, /* 1 day */
		expiryString = new Date(Date.now() + expiry * 1000).toISOString(),
		region = request.env.endpoint.split('.')[2],
		options = {
			regionName: region,
			endpoint: request.env.endpoint,
			secretKey: request.body.secretKey,
			accessKey: request.body.accessKey,
			sessionToken: request.body.sessionToken,
			expires: expiry
		};
	return {
		url: signUrl(options),
		expires: expiryString
	};
});
api.get('/', function (request) {
	'use strict';
	return readFile(path.join(__dirname, 'website', 'index.html'), 'utf8').then(function (content) {
		return content.replace('{{poolid}}', request.env.poolId);
	});
}, {success: {contentType: 'text/html'}});

api.addPostDeployConfig('endpoint', 'end point URL', 'set-endpoint');
api.addPostDeployConfig('poolId', 'cognito pool ID', 'set-pool-id');

