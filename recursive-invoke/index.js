/*global require, module, console */
var aws = require('aws-sdk');
module.exports.handler = function (event, context) {
	'use strict';
	var lambda = new aws.Lambda();
	console.log('received', event);
	if (event.calls > 0) {
		console.log('calling recursive');
		event.calls = event.calls - 1;
		lambda.invoke({
			FunctionName: context.functionName,
			InvocationType: 'Event',
			Payload: JSON.stringify(event),
			Qualifier: context.functionVersion
		}, context.done);
	} else {
		context.succeed('calls: ' + (event.calls) + ' (version ' + context.functionVersion + ')');
	}
};
