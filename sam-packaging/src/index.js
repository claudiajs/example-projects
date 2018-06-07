'use strict';
const htmlResponse = require('./html-response');

exports.handler = (event, context) => {
	const body = `
			<html><body>
			<h1>Hello From SAM</h1>
			<p>This ZIP was packaged using Claudia</p>
			</body></html>
		`;
	return Promise.resolve(htmlResponse(body));
};
