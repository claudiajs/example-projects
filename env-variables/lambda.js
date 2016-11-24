/*global exports, process */
exports.handler = function (event, context, callback) {
	'use strict';
	callback(null, {
		progress: process.env.PROGRESS,
		projectName: process.env.PROJECT_NAME
	});
};
