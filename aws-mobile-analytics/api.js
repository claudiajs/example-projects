/*global module, require, process */
var ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	mobileanalytics = new AWS.MobileAnalytics(),
	api = new ApiBuilder(),
	denodeify = require('denodeify'),
	readline = require('readline'),
	packageJSON = require('./package.json'),
	ask = function (question, PromiseImpl) {
		'use strict';
		return new PromiseImpl(function (resolve, reject) {
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question(question + '? ', function (answer) {
				rl.close();
				if (answer) {
					resolve(answer);
				} else {
					reject(question + ' must be provided');
				}
			});
		});
	};

module.exports = api;

api.get('/', function (request) {
	'use strict';
	var clientContext = {
		'client'  : {
			'client_id'       : request.env.analyticsAppId,
			'app_title'       : request.lambdaContext.functionName,
			'app_version_name': request.context.stage,
			'app_version_code': packageJSON.version,
			'app_package_name': packageJSON.name
		}
	},
	event = {
		eventType: 'hitWithoutEncoding',
		timestamp: new Date().toISOString(),
		attributes: {
			awsRequestId: request.lambdaContext.awsRequestId,
			path: request.context.path,
			userAgent: request.context.userAgent,
			sourceIp: request.context.sourceIp,
			cognitoIdentity: request.lambdaContext.cognitoIdentityId,
			cognitoAuthenticationProvider: request.lambdaContext.cognitoAuthenticationProvider
		}
		/*,
		metrics: {
			progress: 0.1
		}*/
	},
	params = {
		clientContext: JSON.stringify(clientContext),
		events: [event]
	};
	mobileanalytics.putEventsAsync = denodeify(mobileanalytics.putEvents);
	return mobileanalytics.putEventsAsync(params).then(function (result) {
		return {
			sent: params,
			received: result
		};
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
