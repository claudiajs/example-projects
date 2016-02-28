# Storing and retrieving from Dynamo db

This simple example shows how to store, retrieve and delete some data (users) to and from DynamoDb, the AWS document database. 

**NOTE** 
This example requires that you set up a dynamodb-table, with a `string` primary key called `userid`. Create the table using the [DynamoDb console](https://us-west-2.console.aws.amazon.com/dynamodb/)

The table name is stored in the Lambda stage variables. Go to https://console.aws.amazon.com/apigateway/home/apis/[YOUR API ID]/stages/latest and click Stages -> latest -> Stage variables

In the code the stage variables will be found in: `request.env`. I have a helper (`getTableName`) that sets a default value, if this is not found

**NOTE THIS TOO** 
You will also have to give the `[your-lambda]-executor` role access to DynamoDb. Got to [IAM](https://console.aws.amazon.com/iam/) and set it up.

## Get started

To set this up, first [set up the credentials](https://github.com/claudiajs/claudia/blob/master/getting_started.md#configuring-access-credentials), then. 

1. run `npm install` to grab the dependencies
2. run `npm run create` to create the lambda project under the default name on AWS. 
    1. For subsequent deploys use the `npm run deploy` script
3. Test the API with using the [example requests below](#testing)

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
You can test the API by using `curl` (or using a fancier client like [Postman](https://www.getpostman.com/)). Below are some examples with `curl`. 

Replace `[API ID]` with the ID of your API (see the generated `claudia.json` file, something like: `qxgwaa3n6b`), in the examples below.

**Create new user**
```bash
curl -H "Content-Type: application/json" -X POST -d "{'userId' : '123', 'name' : 'Marcus Hammarberg', 'age' : 43 }" https://[API ID].execute-api.us-west-2.amazonaws.com/latest/user
```

**Get user**
```bash
curl -H "Content-Type: application/json" https://[API ID].execute-api.us-west-2.amazonaws.com/latest/user/123
```

**Delete user**
```bash
curl -X DELETE https://[API ID].execute-api.us-west-2.amazonaws.com/latest/user/123
```