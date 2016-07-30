# Storing and retrieving from DynamoDB 

This simple example shows how to store, retrieve and delete some data (users) to and from DynamoDB, the AWS document database. It also shows how to use API Gateway stage variables to store configuration information for different Lambda versions (eg development, testing or production resources).

_updated: 30 July 2016 - using AWS SDK DynamoDB client directly, with promises, and configuring stage variables as post-deploy steps_

## Prerequisites

Create a table in DynamoDB, with a `string` primary key called `userid`. You can do that from the DynamoDB web console, or using the AWS CLI command line. Here is an example command that will create the table with the minimal provisioned throughput:

```bash
aws dynamodb create-table --table-name dynamo-test \
  --attribute-definitions AttributeName=userid,AttributeType=S \
  --key-schema AttributeName=userid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --query TableDescription.TableArn --output text
```

This example project includes an IAM access policy that will grant the lambda function access to all your DynamoDB tables, to make it easier to get started. If you wish, you can edit the [policies/access-dynamodb.json](policies/access-dynamodb.json) file and restrict the access to your new table only.

## Get started

To set this up, first [set up the credentials](https://github.com/claudiajs/claudia/blob/master/getting_started.md#configuring-access-credentials), then: 

1. run `npm install` to grab the dependencies
2. run `npm run create` to create the lambda project under the default name on AWS. This will also ask you for the table name, and enter it when required. If you used the example above, the table name will be `dynamo-test` 
3. Test the API with using the [example requests below](#testing)

For subsequent updates, use the `npm run deploy` command.

## The API

* `POST` to `/user` - stores a new user data object
* `GET` to `/user/{id}` - returns user with id `{id}`
* `DELETE` to `/user/{id}` - deletes the user with id `{id}`

## Testing

Claudia will print the API URL after it is created (typically something in the format `https://[API ID].execute-api.[REGION].amazonaws.com/latest`. Replace `<API-URL>` with that value in the examples below:

You can test the API by using `curl` (or using a fancier client like [Postman](https://www.getpostman.com/)). Below are some examples with `curl`. 

### Create new user

This will create a user from the data stored in [example.json](example.json). Change the data in the file to create other users:

```bash
curl -H "Content-Type: application/json" -X POST --data @example.json <API-URL>/user
```

### Get user

This will get the user ID 123 (replace the ID to get other users)

```bash
curl <API-URL>/user/123
```

### Delete user

This will delete the user ID 123 (replace the ID to get other users)

```bash
curl -X DELETE <API-URL>/user/123
```

## How it works

AWS SDK supports `Promise` calls, and we're using them in the examples directly to make API request processing wait for an external asynchronous call. Just return the promise from the request processor and it all works out of the box. Alternatively, use `.then` on that promise and return something else, to override the result. The `POST` handler creating a new user returns the DynamoDB result directly. The `GET` handler post-processes the result, returning only a sub-object. The `DELETE` handler replaces the result with a human-readable message.

The table name, stored in the API Gateway stage variables, is passed to each request processor in the `request.env` key-value map. Check out [index.js](index.js) to see it used. 

The value is set during the first deployment, using `--configure-db`. This works using a post-deploy step (check out the last line of [index.js](index.js) for the actual setup, and [Configuring stage variables using post-deployment steps](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#configuring-stage-variables-using-post-deployment-steps) for more information about the API). 
