/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = module.exports = new ApiBuilder(),
	superb = require('superb'),
	renderPage = function (body) {
		'use strict';
		return '<html> ' +
					'<body>' +
					'<h1>Hello from Claudia.js</h1>' +
					body +
					'</body>' +
			'</html>';
	};

// this should show up as a normal web page in the browser, the response type is text/html
api.get('/start.html', function () {
	'use strict';
	return renderPage(
			'<ul>' +
				'<li><a href="search?name=mike">Valid search</a></li>' +
				'<li><a href="search">Invalid search (will return 403)</a></li>' +
				'<li><a href="redirect">Redirect to GitHub</a></li>' +
			'</ul>'
		);
}, { success: { contentType: 'text/html'}});

// because the success code is 3xx, the content will be used as the redirect location
api.get('/redirect', function () {
	'use strict';
	return 'https://github.com/claudiajs/claudia';
}, { success: 302 });

// both the success and the error show as web pages, but the error is 403, not the default 500
api.get('/search', function (request) {
	'use strict';
	if (request.queryString.name) {
		return renderPage('<h2>' + request.queryString.name + ' is ' + superb() + '</h2>');
	} else {
		throw renderPage('<div style="color: red">Please provide a name</a>');
	}
}, {error: {code: 403, contentType: 'text/html'}, success: {contentType: 'text/html'}});

