# Storing and retrieving from DynamoDB 

This simple example shows how to store, retrieve and delete some data (users) to and from DynamoDB, the AWS document database. It also shows how to use API Gateway stage variables to store configuration information for different Lambda versions (eg development, testing or production resources).

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
2. run `npm run create` to create the lambda project under the default name on AWS. 
3. configure the API gateway to access your DynamoDB table, by setting up the `tableName` stage variable to point to your table in the `latest` API gateway stage. You can do that from the command line (replace `API_ID` with the ID of your API, from `claudia.json`, and `TABLE_NAME` with the name of the table (if you used the example command to create the table, this will be `dynamo-test`):

  ```bash 
  aws apigateway create-deployment --rest-api-id API_ID \
    --stage-name latest --variables tableName=TABLE_NAME
  ```

4. Test the API with using the [example requests below](#testing)

For subsequent updates, use the `npm run deploy` command.

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

Replace `[API ID]` with the ID of your API (see the generated `claudia.json` file, something like: `qxgwaa3n6b`), and `[REGION]` with your AWS Region (eg `us-west-2`) in the examples below.

### Create new user

```bash
curl -H "Content-Type: application/json" -X POST -d "{'userId' : '123', 'name' : 'Marcus Hammarberg', 'age' : 43 }" https://[API ID].execute-api.[REGION].amazonaws.com/latest/user
```

### Get user

```bash
curl -H "Content-Type: application/json" https://[API ID].execute-api.[REGION].amazonaws.com/latest/user/123
```

### Delete user

```bash
curl -X DELETE https://[API ID].execute-api.[REGION].amazonaws.com/latest/user/123
```

## How it works


The table name, stored in the Lambda stage variables, is passed with each request in the `request.env` key-value map. Check out [main.js](main.js) to see how it is used, in the `getTableName` helper function.

Claudia automatically creates a stage called `latest` if no specific version is provided. You can create additional stages and automatically grant execution privileges by using `claudia set-version`. For example, the following command will create a `development` stage:

```bash
claudia set-version --version development
```

You can then add the `tableName` stage variable for `development` to point to a specific table. To invoke that API version, replace the word `latest` with `development` in the URL examples above.
