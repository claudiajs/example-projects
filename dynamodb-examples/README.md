# Storing and retrieving from Dynamo db

This simple example shows how to store, retrieve and delete some data (users) to and from DynamoDb, the AWS document database. 

**NOTE** 
This example requires that you set up a dynamodb-table with the name `dynamodb-examples-users`, with a `string` primary key called `userid`. Create the table using the [DynamoDb console](https://us-west-2.console.aws.amazon.com/dynamodb/)

**NOTE THIS TOO** 
You will also have to give the `[your-lambda]-executor` role access to DynamoDb. Got to [IAM](https://console.aws.amazon.com/iam/) and set it up.

## The API

* `POST` to `/user` - stores a new user data object
* `GET` to `/user/{id}` - returns user with id `{id}`
* `DELETE` to `/user/{id}` - deletes the user with id `{id}`

### Model
Post `application/json` that looks like this: 

```json
{
    "userId" : "123",
    "name" : "Marcus Hammarberg",
    "age" : 43
}
```

## Testing
You can test the API by using `curl` (or using a fancier client like [Postman](https://www.getpostman.com/)). 

Below are some examples with `curl`. Replace `[your lambda url]` with the url to your lambda. Something like: `https://wv2202dss3s.execute-api.us-west-2.amazonaws.com/latest/user`

**Create new user**
```bash
curl -H "Content-Type: application/json" -X POST -d "{'userId' : '123', 'name' : 'Marcus Hammarberg', 'age' : 43 }" https://qxgwaa3n6a.execute-api.us-west-2.amazonaws.com/latest/user
```

**Get user**
```bash
curl -H "Content-Type: application/json" https://qxgwaa3n6a.execute-api.us-west-2.amazonaws.com/latest/user/123
```

**Delete user**
```bash
curl -X DELETE https://qxgwaa3n6a.execute-api.us-west-2.amazonaws.com/latest/user/123
```