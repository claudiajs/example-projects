# Handling binary content with API Gateway

This project demonstrates how to configure API Gateway using Claudia API Builder to support binary content handling. There are three endpoints:

* `/img`: shows how to receive a text request and respond with binary content
* `/info` endpoint shows how to receive binary content and respond with text
* `/thumb`: endpoint shows how to receive and respond with binary content

## Try it out

* run `npm install` to download the dependencies
* run `npm run create` to deploy the project to Lambda. Grab the API ID from the result and replace `<API-ID>` in the example commands below

### retrieve a picture (text request, binary result)

```
curl https://<API-ID>.execute-api.us-east-1.amazonaws.com/latest/img -H "Accept: image/png" > 1.png
```

### get info about a pic (binary request, text result) 

```
curl --request POST -H "Content-Type: image/png" --data-binary "@img.png" https://<API-ID>.execute-api.us-east-1.amazonaws.com/latest/info
```

### make a thumbnail (binary post, binary result)


```
curl --request POST -H "Content-Type: image/png" -H "Accept: image/png" --data-binary "@img.png" https://<API-ID>.execute-api.us-east-1.amazonaws.com/latest/thumb > thumb.png
```

## More information

Check out the [Handling Binary Content Tutorial](https://claudiajs.com/tutorials/binary-content.html) for more information on these features, and see the [Binary Data Type support for API Gateway](https://aws.amazon.com/about-aws/whats-new/2016/11/binary-data-now-supported-by-api-gateway/) for more information on how things are configured under the hood.

