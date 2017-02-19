exports.handler = function (event, context, callback) {
	'use strict';
	console.log('got event', event);
	callback(null, 'OK');
};
