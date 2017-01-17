/*global module, require, console, Promise */
const childProcess = require('child_process'),
	execPromise = function (command) {
		'use strict';
		return new Promise(function (resolve, reject) {
			childProcess.exec(command, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},
	spawnPromise = function (command, options) {
		'use strict';
		return new Promise(function (resolve, reject) {
			const process = childProcess.spawn(command, options),
				result = [];
			process.stdout.on('data', function (buffer) {
				console.log(buffer.toString());
				result.push(buffer.toString());
			});
			process.stderr.on('data', function (buffer) {
				console.error(buffer.toString());
			});
			process.on('close', function (code) {
				if (code !== 0) {
					reject(code);
				} else {
					resolve(result.join(''));
				}
			});
		});
	};
module.exports = {
	exec: execPromise,
	spawn: spawnPromise
};
