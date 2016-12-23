import API from 'claudia-api-builder';

const api = new API();

api.get('/', () => 'Hello');

module.exports = api;
