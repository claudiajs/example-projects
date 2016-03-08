/*
 * dataStore.js
 * Data persistency / CRUD layer
 */
import Promise from 'bluebird';
import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

const getTableName = function () {
    return 'claudia-graphql-example';
};

const addUser = function (user) {
    return new Promise(function(resolve, reject) {
        var params = {
            TableName: getTableName(),
            Item: {
                userid: user.userid,
                name: user.name,
                age: user.age
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.log('---- err: ', err);
                reject(err);
            } else {
                console.log('---- data: ', data);
                resolve(user);
            }
        });
    });
}; //addUser

const getUser = function (userid) {
    return new Promise(function(resolve, reject) {
        var params = {
            TableName: getTableName(),
            AttributesToGet: ['userid', 'name', 'age']
        };
        if (userid) {
            //search by userid
            params.Key = {userid: userid}
            docClient.get(params, function(err, data) {
                if (err) return reject(err);
                return resolve([data.Item]);
            });
        } else {
            //get all users
            docClient.scan(params, function(err, data) {
                if (err) return reject(err);
                return resolve(data['Items']);
            });
        }
    });
}; //getUser

const deleteUser = function (userid) {
    return new Promise(function(resolve, reject){
        getUser(userid)
            .then( resultArr => {
                const toBeDeletedUser = resultArr[0];
                if (!toBeDeletedUser || !toBeDeletedUser.userid) {
                    return reject(`Delete user failed: no user with userid ${userid}`);
                }
                var params = {
                    TableName: getTableName(),
                    Key: {
                        userid: toBeDeletedUser.userid
                    }
                };
                docClient.delete(params, function(err, data) {
                    if (err) return reject(err);
                    return resolve(toBeDeletedUser);
                });
            })
            .catch(err => reject(err));
    });
}; //deleteUser

export default {addUser, getUser, deleteUser};
