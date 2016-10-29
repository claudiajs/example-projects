/*global exports, require*/
var convert = require('./convert');
exports.handler = function (event, context) {
	'use strict';
	var eventRecord = event.Records && event.Records[0];
	if (!eventRecord) {
		return context.fail('no records in the event');
	}
	if (eventRecord.eventSource !== 'aws:s3' || !eventRecord.s3) {
		context.fail('unsupported event source');
	}
	convert(eventRecord.s3.bucket.name, eventRecord.s3.object.key).then(context.done, context.fail);
};
