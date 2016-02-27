/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    Promise = require('bluebird'),
    AWS = require("aws-sdk"),
    DOC = require("dynamodb-doc");

AWS.config.update({ region: "us-west-2" });
var docClient = new DOC.DynamoDB();

// Create promisified versions of the docClient functions we will use
var putItem = Promise.promisify(docClient.putItem, { context: docClient });
var getItem = Promise.promisify(docClient.getItem, { context: docClient });
var deleteItem = Promise.promisify(docClient.deleteItem, { context: docClient });

const TABLE_NAME = "dynamodb-examples-users";

module.exports = api;

// Create new user
api.post('/user', function(request) {
	'use strict';
    
    // Create our model from the posted data
    // (psst should an application/x-form-www-urlencoded be used 
    //	we could have read it below with request.post.userId)
    var postedData = {
        userId: request.body.userId,
        name: request.body.name,
        age: request.body.age
    };

    // Set up parameters for dynamo
    var params = {
        TableName: TABLE_NAME,
        Item: {
            userid: postedData.userId,
            name: postedData.name,
            age: postedData.age
        }
    };

    // Store it and return the promise, 
    // that will evaluate before reponding back to the client
    return putItem(params)
        .then(function(data) {
            return "Created";
        });

}, { success: 201 }); // Return HTTP status 201 - Created when successful

// get user for {id}
api.get('/user/{id}', function(request) {
    // Get the id from the pathParams
    var id = request.pathParams.id;

    // Set up parameters for dynamo
    var params = {
        TableName: TABLE_NAME,
        Key: {
            userid: id
        }
    };

    // Get the item using our promisified function
    // simply returning the data in the .then-clause
    return getItem(params)
        .then(function(data) {
            return data;
        });
}); //200 ok is standard for non-errors

// delete user with {id}
api.delete('/user/{id}', function(request) {
	'use strict';
    
    // Get the id from the pathParams
    var id = request.pathParams.id;

    // Set up parameters for dynamo
    var params = {
        TableName: TABLE_NAME,
        Key: {
            userid: id
        }
    };

	// Get the item using our promisified function
    // return a nice little message in the .then-clause
    return deleteItem(params)
        .then(function(data) {
            return "Deleted user with id '" + id + "'";
        });
}); //200 ok is standard for non-errors