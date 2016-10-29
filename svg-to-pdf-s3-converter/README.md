# SVG to PDF S3 Lambda converter

Lambda function that waits for SVG files uploaded to S3, converts them to PDF using rsvg-convert (librsvg and cairo) and uploads back to S3. 

This example shows how to wire up S3 file conversion that runs an external processor, in this case [rsvg-convert](http://live.gnome.org/LibRsvg). This example project uses a [pre-built binary version of rsvg-convert for AWS Lambda](https://github.com/claudiajs/rsvg-convert-aws-lambda-binary). 

## Prerequisites

* create a S3 bucket for file uploads

## Setting up the converter

1. run `npm install` to fetch the dependencies
2. run `npm start` to deploy the initial lambda version
3. modify the [package.json](package.json) `connect` script to use your bucket name
4. run `npm run connect` to configure your S3 bucket to invoke the lambda function when a new file is uploaded to the `/in` directory

## Try it out

Once you've installed everything, send a test SVG file to your bucket using the S3 console, or the AWS CLI tools. The command lines below assume the bucket is called `test-svg-bucket`, so adjust the commands for your bucket name accordingly.

```bash
aws s3 cp example.svg s3://test-svg-bucket/in/example.svg
```

Wait a few seconds, and then check if the `/out` folder of your S3 bucket

```bash
aws s3 ls s3://test-svg-bucket/out/
```

Download the file with the same base name, but the `pdf` extension, from the `/out` folder:

```bash
aws s3 cp s3://test-svg-bucket/out/example.pdf .
```

