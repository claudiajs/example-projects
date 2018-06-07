# SAM Packaging example

This is a demo project to show how to use `claudia pack` to prepare a code package for the AWS Serverless Application Model and CloudFormation. 

SAM doesn't know about NPM. But Claudia does, and that's one of its best features. Until version 5, if you wanted to get the benefits from the Claudia packaging pipeline, you had to use Claudia to deploy as well. With version 5, we introduced a new command, `claudia pack`, that just creates a clean deployable ZIP with all the knowledge of NPM, so you can use it inside SAM, CloudFormation or with any other tool. `claudia pack` will use your NPM configuration to include only the required files, include only production dependencies, repackage all the local `file:` dependencies correctly, remove duplicated dependencies to reduce the package size, copy everything into `node_modules` without symbolic links and fix potential file permission problems in all the dependencies. You can even customise packaging by including a post-package script in your NPM project, and claudia will run it after the files are ready but before producing the final zip. Because development dependencies will be excluded automatically, it's safe to include claudia as a development dependency in your SAM projects directly, so you don't have to install it to your global modules.

## Prerequisites

- AWS command line tools (aws-cli) installed to run CloudFormation scripts
- S3 bucket for deployments

## Try it out

### Step 1: install the dependencies

```
npm i
```

### Step 2: create the zip

```
npm run pack-zip
```

This will create a lambda.zip in your local directory, with all the files packaged for deployment, including production dependencies but excluding any development or optional dependencies.

### Step 3: 

Run CloudFormation to deploy the stack using SAM (replace the region, bucket name and stack name in the commands below according to your deployment needs):

```
aws cloudformation package --template-file template.yaml --output-template-file output.yaml --s3-bucket <DEPLOYMENT_BUCKET_NAME> --region us-east-1 

aws cloudformation deploy --template-file output.yaml --stack-name samStack --region us-east-1 --capabilities CAPABILITY_IAM
```

### Step 4: Get the URL of your new deployment:

```
aws cloudformation describe-stacks --region us-east-1 --query 'Stacks[?StackName==`samStack`].Outputs' --output table
``` 

### Step 5: open the URL

The URL should open in your browser directly, showing a simple HTML page served by [src/index.js](src/index.js)
