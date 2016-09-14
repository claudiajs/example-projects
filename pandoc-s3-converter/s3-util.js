/*global module, require, Promise, console */

var aws = require('aws-sdk'),
	path = require('path'),
	fs = require('fs'),
	os = require('os'),
	uuid = require('uuid'),
	s3 = new aws.S3(),
	downloadFromS3 = function (bucket, fileKey) {
		'use strict';
		console.log('downloading', bucket, fileKey);
		return new Promise(function (resolve, reject) {
			var filePath = path.join(os.tmpdir(), uuid.v4() + path.extname(fileKey)),
				file = fs.createWriteStream(filePath),
				stream = s3.getObject({
					Bucket: bucket,
					Key: fileKey
				}).createReadStream();

			stream.setEncoding('utf8');

			stream.on('error', reject);
			file.on('error', reject);
			file.on('finish', function () {
				console.log('downloaded', bucket, fileKey);
				resolve(filePath);
			});
			stream.pipe(file);
		});
	}, uploadToS3 = function (bucket, fileKey, filePath, acl) {
		'use strict';
		console.log('uploading', bucket, fileKey, filePath, acl);
		return new Promise(function (resolve, reject) {
			s3.upload({
				Bucket: bucket,
				Key: fileKey,
				Body: fs.createReadStream(filePath),
				ACL: acl || 'private'
			}, function (error, result) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			})
		});
	};

module.exports = {
	download: downloadFromS3,
	upload: uploadToS3
};
