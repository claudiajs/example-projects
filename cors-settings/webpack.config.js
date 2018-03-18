/*global require, module, __dirname, process, console */
const path = require('path');
module.exports = {
	entry: { 'main': path.resolve(__dirname, 'web.js') },
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	}
};
