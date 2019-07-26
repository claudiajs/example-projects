/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder();

module.exports = api;

api.get('/', function () {
	'use strict';
	return 'Hello from your Private API';
});

api.addPostDeployStep('Update to Private', async function (options, lambdaDetails, utils) {
	'use strict';

	let policy = '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"execute-api:Invoke","Resource":"arn:aws:execute-api:REGIONTEMPLATE:ACCOUNTTEMPLATE:APITEMPLATE/*","Condition":{"StringEquals":{"aws:sourceVpce":"VPCETEMPLATE"}}}]}';
	policy = policy.replace("ACCOUNTTEMPLATE",options.account);
	policy = policy.replace("APITEMPLATE",lambdaDetails.apiId);
	policy = policy.replace("REGIONTEMPLATE",lambdaDetails.region);
	policy = policy.replace("VPCETEMPLATE",options.vpce);

	let params = {
		restApiId: lambdaDetails.apiId,
		patchOperations: [
			//This patch will replace the existing policy with your policy above
			{
				op: 'replace',
				path: '/policy',
				value: policy
			},
			//This patch will update the API endpoint type from EDGE -> PRIVATE
			{
				op: 'replace',
				path: '/endpointConfiguration/types/EDGE',
				value :'PRIVATE'
			}
		]
	};
	await utils.apiGatewayPromise.updateRestApiPromise(params);


	await utils.apiGatewayPromise.createDeploymentPromise({restApiId: lambdaDetails.apiId, stageName: lambdaDetails.alias});
});

