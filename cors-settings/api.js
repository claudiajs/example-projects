const Api = require('claudia-api-builder'),
	api = new Api();

api.post('/registrants', function (request) {
	return request.body;
});

api.corsMaxAge(60);
api.corsOrigin('http://localhost:8080')

module.exports = api;
