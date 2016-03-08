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
    if (typeof request.body === 'object' && Object.keys(request.body).length === 0) {
        return 'Missing required GraphQL string in request body';
    }
    return graphql(schema, request.body);
});

export default api;
