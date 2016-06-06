/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

api.get('/', function (request) {
	'use strict';
	return request.env.message || 'hello world';
});

api.addPostDeployStep('message', function (options, lambdaDetails, utils) {
	'use strict';
	var customMessage = options['custom-message'];
	if (!customMessage) {
		return;
	}
	return utils.apiGatewayPromise.createDeploymentPromise({
		restApiId: lambdaDetails.apiId,
		stageName: lambdaDetails.alias,
		variables: { 'message': customMessage }
	}).then(function () {
		return customMessage;
	});
});

