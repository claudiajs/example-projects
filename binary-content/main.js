/*global exports*/
const path = require('path'),
	os = require('os'),
	ApiBuilder = require('claudia-api-builder'),
	fs = require('./fs-promise'),
	childProcess = require('./child-process-promise'),
	api = new ApiBuilder();

module.exports = api;

//api.setBinaryMediaTypes(['image/*']);

api.get('/img', () => {
	'use strict';
	return fs.readFilePromise(path.join(__dirname, 'img.png'));
}, { success: { contentType: 'image/png', contentHandling: 'CONVERT_TO_BINARY'}});


api.post('/info', (request) => {
	'use strict';
	const tempFileName = path.join(os.tmpdir(), request.lambdaContext.awsRequestId);
	let result;
	return fs.writeFilePromise(tempFileName, request.body)
		.then(() => childProcess.spawn('/usr/bin/identify', [tempFileName]))
		.then(picInfo => result = picInfo.replace(/[^\s]*\s/, ''))
		.then(() => fs.unlinkPromise(tempFileName))
		.then(() => result);
}, { success: { contentType: 'text/plain' } });

api.post('/thumb', (request) => {
	'use strict';
	const tempFileName = path.join(os.tmpdir(), request.lambdaContext.awsRequestId),
		thumbFileName = tempFileName + '-thumb.png';
	let result;
	return fs.writeFilePromise(tempFileName, request.body)
		.then(() => childProcess.spawn('/usr/bin/convert', ['-resize', '150x', tempFileName, thumbFileName]))
		.then(() => fs.readFilePromise(thumbFileName))
		.then(fileContents => result = fileContents)
		.then(() => fs.unlinkPromise(tempFileName))
		.then(() => fs.unlinkPromise(thumbFileName))
		.then(() => result);
}, { success: { contentType: 'image/png', contentHandling: 'CONVERT_TO_BINARY' } });
