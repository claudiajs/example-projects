/*global require, module, console */
var path = require('path'),
	fs = require('fs'),
	os = require('os'),
	uuid = require('uuid'),
	pandocBinaryPath = '/opt/bin/pandoc',
	cpPromise = require('./child-process-promise'),
	s3 = require('./s3-util');

module.exports = function convert(bucket, fileKey) {
	'use strict';
	var targetPath, sourcePath;
	console.log('converting', bucket, fileKey);
	return s3.download(bucket, fileKey).then(function (downloadedPath) {
		sourcePath = downloadedPath;
		targetPath = path.join(os.tmpdir(), uuid.v4() + '.docx');
		return cpPromise.spawn(pandocBinaryPath, [sourcePath, '-o', targetPath]);
	}).then(function () {
		var uploadKey = fileKey.replace(/^in/, 'out').replace(/\.[A-z0-9]+$/, '.docx');
		return s3.upload(bucket, uploadKey, targetPath);
	}).then(function () {
		console.log('deleting', targetPath, sourcePath);
		fs.unlinkSync(targetPath);
		fs.unlinkSync(sourcePath);
	});
};
