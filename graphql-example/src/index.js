/*
 * index.js
 * API handler
 */
import ApiBuilder from 'claudia-api-builder';
import {graphql} from 'graphql';
import schema from './schema';

const api = new ApiBuilder();

api.post('/graphql', function (request) {
    // request.body.query is the GraphQL query string. It must exist
    if (!request.body.query) {
        return 'Missing required GraphQL query string in POST body';
    }
    if (typeof request.body.query !== 'string') {
        return 'query property in POST body must be a string';
    }
    return graphql(schema, request.body.query);
});

export default api;
