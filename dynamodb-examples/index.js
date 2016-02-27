/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    Promise = require('bluebird'),
    AWS = require("aws-sdk"),
    DOC = require("dynamodb-doc");

AWS.config.update({ region: "us-west-2" });
var docClient = new DOC.DynamoDB();

const TABLE_NAME = "dynamodb-examples-users";

module.exports = api;

// Create new user
api.post('/user', function(request) {
    'use strict';

    var postedData = {
        userId: request.body.userId,
        name: request.body.name,
        age: request.body.age
    };

    // Set up params for dynamo
    var params = {
        TableName: TABLE_NAME,
        Item: {
            userid: postedData.userId,
            name: postedData.name,
            age: postedData.age
        }
    };

    var putItem = Promise.promisify(docClient.putItem, { context: docClient });

    // Store it and return the promise, 
    // that will evaluate before reponding
    return putItem(params)
        .then(function(data) {
            return "Created";
        });

}, { success: 201 }); // Return HTTP status 201 - Created when successful

// get user for id
api.get('/user/{id}', function(request) {
    'use strict';
    var id = request.pathParams.id;

    // Set up params for dynamo
    var params = {
        TableName: TABLE_NAME,
        Key: {
            userid: id
        }
    };

    var getItem = Promise.promisify(docClient.getItem, { context: docClient });

    return getItem(params)
        .then(function(data) {
            return data;
        });

});

// delete user with {id}
api.delete('/user/{id}', function(request) {
    'use strict';

    var id = request.pathParams.id;

    // Set up params for dynamo
    var params = {
        TableName: TABLE_NAME,
        Key: {
            userid: id
        }
    };

    var deleteItem = Promise.promisify(docClient.deleteItem, { context: docClient });

    return deleteItem(params)
        .then(function(data) {
            return "Deleted user with id '" + id + "'";
        });
});