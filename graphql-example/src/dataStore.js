/*
 * dataStore.js
 * Data persistency / CRUD layer
 */
'use strict';
const AWS = require('aws-sdk'),
	docClient = new AWS.DynamoDB.DocumentClient(),
	getTableName = function () {
		return 'claudia-graphql-example';
	},
	addUser = function (user) {
		const params = {
			TableName: getTableName(),
			Item: {
				userid: user.userid,
				name: user.name,
				age: user.age
			}
		};
		return docClient.put(params).promise().then(() => user);
	},
	getUser = function (userid) {
		const params = {
			TableName: getTableName(),
			AttributesToGet: ['userid', 'name', 'age']
		};
		if (userid) {
			//search by userid
			params.Key = {userid: userid};
			return docClient.get(params).promise()
				.then(data => [data.Item]);
		} else {
			//get all users
			return docClient.scan(params).promise()
				.then(data => data.Items);
		}
	},
	deleteUser = function (userid) {
		let toBeDeletedUser;

		return getUser(userid)
			.then(resultArr => {
				toBeDeletedUser = resultArr[0];
				if (!toBeDeletedUser || !toBeDeletedUser.userid) {
					throw `Delete user failed: no user with userid ${userid}`;
				}
			}).then(() => {
				const params = {
					TableName: getTableName(),
					Key: {
						userid: userid
					}
				};
				return docClient.delete(params).promise();
			}).then(() => toBeDeletedUser);
	}; //deleteUser

module.exports = { addUser: addUser, getUser: getUser, deleteUser: deleteUser };
