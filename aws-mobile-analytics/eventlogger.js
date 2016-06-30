/*global require, module */
var AWS = require('aws-sdk'),
	mobileanalytics = new AWS.MobileAnalytics(),
	denodeify = require('denodeify');

module.exports = function EventLogger(request, applicationId) {
	'use strict';
	var packageJSON = require('./package.json'),
		initialTimestamp = new Date().toISOString(),
		clientContext = {
			'client'  : {
				'client_id'		: request.context.user || request.lambdaContext.awsRequestId,
				'app_title'		: request.lambdaContext.functionName,
				'app_version_name': request.context.stage,
				'app_version_code': packageJSON.version,
				'app_package_name': packageJSON.name
			},
			'env'     : {
				'platform'	: 'linux'
			},
			'services': {
				'mobile_analytics': {
					'app_id'	: applicationId
				}
			},
			'custom' : {}
		};

	this.logEvent = function (eventType, additionalProperties, metrics) {
		var properties = {
				awsRequestId: request.lambdaContext.awsRequestId,
				path: request.context.path,
				userAgent: request.context.userAgent,
				sourceIp: request.context.sourceIp,
				cognitoIdentity: request.lambdaContext.cognitoIdentityId,
				cognitoAuthenticationProvider: request.lambdaContext.cognitoAuthenticationProvider
			},
			event = {
				eventType: eventType,
				timestamp: new Date().toISOString(),
				attributes: properties,
				session : {
					'id' :  request.lambdaContext.awsRequestId,
					'startTimestamp' : initialTimestamp
				},
				version : 'v2.0',
				metrics: metrics || {}
			},
			params = {
				clientContext: JSON.stringify(clientContext),
				events: [event]
			};
		Object.keys(additionalProperties).forEach(function (property) {
			properties[property] = additionalProperties[property];
		});
		mobileanalytics.putEventsAsync = denodeify(mobileanalytics.putEvents);
		return mobileanalytics.putEventsAsync(params);
	};
	this.addConfigurationHooks = function (api) {

	};
};
