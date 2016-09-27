/*global exports*/
exports.handler = function (event, context) {
	'use strict';
	context.succeed({
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(event)
	});
};
