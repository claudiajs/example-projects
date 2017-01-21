/*
 * index.js
 * API handler
 */
import ApiBuilder from 'claudia-api-builder';
import {graphql} from 'graphql';
import schema from './schema';

const api = new ApiBuilder();

api.post('/graphql', function (request) {
    // request.body is the GraphQL query string. It must exist
    if (typeof request.body !== 'string') {
        return 'POST body must be a string';
    }
    return graphql(schema, request.body);
});

export default api;
