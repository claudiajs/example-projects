/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	numeral = require('numeral'),
	got = require('got'),
	TimeAgo = require('time-ago'),
	fs = Promise.promisifyAll(require('fs')),
	api = module.exports  = new ApiBuilder(),
	getRepoDetails = function (repo, env) {
		'use strict';
		var appAuthorisation = '', url;
		/* increase rate limits by authenticating a gihtub app */
		if (env.githubClientId && env.githubClientSecret) {
			appAuthorisation = '?client_id=' + env.githubClientId + '&client_secret=' + env.githubClientSecret;
		}
		url = 'https://api.github.com/repos/' + repo.owner + '/' + repo.name + appAuthorisation;
		//console.log('looking for ', url);
		return got(url)
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
		return getRepoDetails(githubRepo, request.env);
	}).then(function (repoDetails) {
		var dateFormatter = new TimeAgo(),
			fmt = function (number) {
				if (number > 999 && number < 100000) {
					return numeral(number).format('0.0a');
				} else {
					return numeral(number).format('0a');
				}
			},
			displayName = (repoDetails.full_name.length <= 20) ? repoDetails.full_name : repoDetails.name,
			replacements = {
				name: displayName,
				forks: fmt(repoDetails.forks_count),
				stars: fmt(repoDetails.stargazers_count),
				created: dateFormatter.ago(repoDetails.created_at),
				updated: dateFormatter.ago(repoDetails.updated_at)
			};
		Object.keys(replacements).forEach(function (key) {
			template = template.replace('(' + key + ')', replacements[key]);
		});
		return template;
	});
}, {success: {contentType: 'image/svg+xml'}});
