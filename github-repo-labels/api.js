/*global require, module */
var API = require('claudia-api-builder'),
	TimeAgo = require('time-ago'),
	numeral = require('numeral'),
	formatter = new TimeAgo(),
	got = require('got'),
	fs = require('fs-promise'),
	api = new API();

module.exports = api;

var getRepoDetails = function (owner, repo, env) {
	'use strict';
	var appAuthorization = '', url;
	if (env.githubClientId && env.githubSecret) {
		appAuthorization = '?client_id=' + env.githubClientId + '&client_secret=' + env.githubSecret;
	}
	url = 'https://api.github.com/repos/' + owner + '/' + repo + appAuthorization;
	return got(url).then(function (response) {
		return JSON.parse(response.body);
	});
};
api.get('{owner}/{repo}/{template}', function (request) {
	'use strict';
	var template;
	return fs.readFile('svg/' + request.pathParams.template, 'utf8').then(function (contents) {
		template = contents;
	}).then(function () {
		return getRepoDetails(request.pathParams.owner, request.pathParams.repo, request.env);
	}).then(function (repoDetails) {
		var displayName = repoDetails.full_name.length <= 20 ? repoDetails.full_name: repoDetails.name,
		fmt = function (number) {
			if (number > 999 && number < 100000) {
				return '0.0a';
			}
			return '0a';
		},
		replacements = {
			name: displayName,
			forks: numeral(repoDetails.forks_count).format(fmt(repoDetails.forks_count)),
			stars: numeral(repoDetails.stargazers_count).format(fmt(repoDetails.stargazers_count)),
			created: formatter.ago(repoDetails.created_at),
			updated: formatter.ago(repoDetails.updated_at)
		};
		Object.keys(replacements).forEach(function (key) {
			template = template.replace('(' + key + ')', replacements[key]);
		});
		return template;
	});
}, { /* apiKeyRequired: true, */ success: { contentType: 'image/svg+xml'}});
