/*global module, require */
var ApiBuilder = require('claudia-api-builder'),
	ask = require('./ask'),
	EventLogger = require('./eventlogger'),
	api = new ApiBuilder();


module.exports = api;

api.get('/', function (request) {
	'use strict';
	var logger = new EventLogger(request, request.env.analyticsAppId),
		name = request.queryString.name || '';

	return logger.logEvent('executed', { name: name }, { length: name.length }).then(function () {
		if (name) {
			return 'Logged for ' + name;
		} else {
			return 'Logged empty request. Specify ?name= to log with a name';
		}
	});
});

api.addPostDeployStep('analyticsConfig', function (options, lambdaDetails, utils) {
	'use strict';
	if (options['configure-analytics']) {
		return ask('Mobile Analytics ID', utils.Promise)
			.then(function (appId) {
				var deployment = {
					restApiId: lambdaDetails.apiId,
					stageName: lambdaDetails.alias,
					variables: {
						analyticsAppId: appId
					}
				};
				return utils.apiGatewayPromise.createDeploymentPromise(deployment).then(function () {
					return appId;
				});
			});
	}
});
