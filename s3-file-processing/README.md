A simple example project that demonstrates acting on S3 events and using Claudia to automatically wire up events and assign related privileges for S3 access. This service will uppercase text files.

To try it out, first create a bucket on S3 where you'll upload the files (no special privileges needed), then:

1. install the dependencies using `npm install`
2. create the function using `npm start`
3. connect bucket events to the lambda function using `claudia add-s3-event-source --bucket BUCKET_NAME --prefix in/` (replace the `BUCKET_NAME` with your bucket name)
4. upload a text file to your bucket into the /in folder
5. check for the file in the /out folder on s3, should be uppercased

Check out [package.json](package.json) to see how the Lambda is created using the `start` script, and [main.js](main.js) to see how the S3 event gets received by the Lambda function. The actual file conversion is in [convert.js](convert.js), where it's just using Node streams to transform the incoming bucket file into the outgoing bucket file. The Lambda context callback conveniently works well when directly passed to the S3 upload function. 
