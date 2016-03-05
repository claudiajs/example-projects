/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	numeral = require('numeral'),
	got = require('got'),
	TimeAgo = require('time-ago'),
	fs = Promise.promisifyAll(require('fs')),
	api = module.exports  = new ApiBuilder(),
	getRepoDetails = function (repo) {
		'use strict';
		return got('https://api.github.com/repos/' + repo.owner + '/' + repo.name)
			.then(function (response) {
				return JSON.parse(response.body);
			});
	};
api.get('/svg/{owner}/{name}', function (request) {
	'use strict';
	var githubRepo = {
		owner: request.pathParams.owner,
		name: request.pathParams.name
	}, template;
	return fs.readFileAsync('template.svg', 'utf8').then(function (contents) {
		template = contents;
	}).then(function () {
		return getRepoDetails(githubRepo);
	}).then(function (repoDetails) {
		var dateFormatter = new TimeAgo(),
			fmt = function (number) {
				if (number < 1000) {
					return number;
				} else {
					return numeral(number).format('0.0a');
				}
			},
			replacements = {
				name: repoDetails.full_name,
				forks: fmt(repoDetails.forks_count),
				watchers: fmt(repoDetails.stargazers_count),
				subscribers: fmt(repoDetails.subscribers_count),
				created: dateFormatter.ago(repoDetails.created_at),
				updated: dateFormatter.ago(repoDetails.updated_at)
			};
		Object.keys(replacements).forEach(function (key) {
			template = template.replace('(' + key + ')', replacements[key]);
		});
		return template;
	});
}, {success: {contentType: 'image/svg+xml'}});
