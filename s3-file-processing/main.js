/*global exports, console, require*/
var convert = require('./convert');
exports.handler = function (event, context) {
	'use strict';
	console.log('processing', JSON.stringify(event));
	var eventRecord = event.Records && event.Records && event.Records[0];
	if (eventRecord) {
		if (eventRecord.eventSource === 'aws:s3' && eventRecord.s3) {
			convert(eventRecord.s3.bucket.name, eventRecord.s3.object.key, context.done);
		} else {
			context.fail('unsupported event source');
		}
	} else {
		context.fail('no records in the event');
	}
};
