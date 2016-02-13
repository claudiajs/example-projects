1. install the dependencies using `npm install`
2. create the function using `npm start`
3. create a s3 bucket (either manually or using the console)
4. set up bucket events to execute the lambda function using `claudia add-s3-event-source --bucket BUCKET_NAME --prefix in/`
5. upload a text file to your bucket into the /in folder
6. check for the file in the /out folder on s3, should be uppercased
