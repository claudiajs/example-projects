/* global require, console */
var AWS = require('aws-sdk'),
	mobileanalytics,
	clientContext = {
		client : {
			client_id: '1d2c3bfa-9c6e-751b-2722-28ee097c87ac',
			app_title: 'JS CLient'
		},
		env: {
			platform: 'linux'
		},
		services: {
			mobile_analytics: {
				app_id: '7c2fdcd226ae4852b01face1c179102f',
				sdk_name: 'aws-sdk-mobile-analytics-js',
				sdk_version: '0.9.1:2.4.3'
			}
		},
		custom: { }
	},
	session = {
		id: '1bc5391b-5d62-b818-511c-45913fd79ec4',
		startTimestamp: '2016-06-30T17:10:53.939Z'
	},
	events = [
		{
			eventType : '_session.start',
			timestamp: '2016-06-30T17:10:53.940Z',
			session: session,
			version: 'v2.0',
			attributes: {},
			metrics: {}
		},
		{
			eventType : 'fromConsole3',
			timestamp: '2016-06-30T17:11:47.210Z',
			session : session,
			version: 'v2.0',
			attributes: {attr1: 'attrval1'},
			metrics: { METRIC_1_NAME: 1}
		}
	],
	eventBatch = {
		'events'       : events,
		'clientContext': JSON.stringify(clientContext)
	};

AWS.config.region = 'us-east-1';
//AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//	IdentityPoolId: 'us-east-1:86d3bed1-94c3-4fdf-b401-ad096cc1f0d7' //Amazon Cognito Identity Pool ID
//});
mobileanalytics = new AWS.MobileAnalytics();
mobileanalytics.putEvents(eventBatch, function (err, data) {
	'use strict';
	console.log('err', err);
	console.log('data', data);
});
