# IOT Topic Filter Example

This is a trivial example that shows how to trigger Lambda functions when a message is posted to [AWS IOT Topics](http://docs.aws.amazon.com/iot/latest/developerguide/topics.html). The lambda function just logs messages, so you can post a message to the topic and then check CloudWatch logs to see the execution result.

## Try it out

1. grab the dependencies: `npm install`
2. create the lambda function: `npm run create` 
3. set up a IOT topic filter: `npm run subscribe`
4. publish an event to the topic: `node post.js`
5. list cloudwatch logs associated with your function: `npm run check-logs`  

## More information

* [claudia add-iot-topic-rule options](https://github.com/claudiajs/claudia/blob/master/docs/add-iot-topic-rule.md)
* [IOT SQL Reference](http://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html)
* [AWS IOT Topics](http://docs.aws.amazon.com/iot/latest/developerguide/topics.html)
