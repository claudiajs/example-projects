# Geolocation using API Gateway

API Gateway requests go through CloudFront, and they will contain a few useful analytic headers, including the geo-location country
where the request originated. This is a simple example that shows how to read out the country header and use it in your API.

## Get started

* run `npm init` to install the dependencies
* run `npm run create` to deploy this project to AWS
* grab the URL printed as the result, and GET it using CURL or paste into a browser

