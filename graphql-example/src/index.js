/*
 * index.js
 * API handler
 */
'use strict';
const ApiBuilder = require('claudia-api-builder'),
	Graphql = require('graphql'),
	schema = require('./schema'),
	api = new ApiBuilder();

api.post('/graphql', request => {
	// request.body is the GraphQL query string. It must exist
	if (typeof request.body !== 'string') {
		return 'POST body must be a string';
	}
	return Graphql.graphql(schema, request.body);
});

module.exports = api;
