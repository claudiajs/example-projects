/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	DOC = require('dynamodb-doc'),
	api = new ApiBuilder(),
	docClient = Promise.promisifyAll(new DOC.DynamoDB());

// Export the api
module.exports = api;

// Create new user
api.post('/user', function (request) {
	'use strict';

	// Map to the item to store from the posted data
	// (psst should an application/x-form-www-urlencoded be used
	//	we could have read it below with request.post.userId etc.)
	var params = {
		TableName: getTableName(request),
		Item: {
			userid: request.body.userId,
			name: request.body.name,
			age: request.body.age
		}
	};

	// Store it and return the promise,
	// that will evaluate before reponding back to the client
	return docClient.putItemAsync(params);

}, { success: 201 }); // Return HTTP status 201 - Created when successful

// get user for {id}
api.get('/user/{id}', function (request) {
	'use strict';
	var id, params;
	// Get the id from the pathParams
	id = request.pathParams.id;

	// Set up parameters for dynamo
	params = {
		TableName: getTableName(request),
		Key: {
			userid: id
		}
	};

	// Get the item using our promisified function
	return docClient.getItemAsync(params);

}); //200 ok is standard for non-errors

// delete user with {id}
api.delete('/user/{id}', function (request) {
	'use strict';
	var id, params;
	// Get the id from the pathParams
	id = request.pathParams.id;

	// Set up parameters for dynamo
	params = {
		TableName: getTableName(request),
		Key: {
			userid: id
		}
	};

	// Get the item using our promisified function
	// return a nice little message in the .then-clause
	return docClient.deleteItemAsync(params)
		.then(function () {
			return 'Deleted user with id "' + id + '"';
		});
}); //200 ok is standard for non-errors

function getTableName(request) {
	'use strict';
	// The table name is stored in the Lambda stage variables
	// Go to https://console.aws.amazon.com/apigateway/home/apis/[YOUR API ID]/stages/latest
	// and click Stages -> latest -> Stage variables

	// These values will be found under request.env
	// Here's I'll use a default if not set
	return request.env.tableName || 'dynamodb-examples-users';
}
