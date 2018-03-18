# cors test example

## set up

0. run `npm i` to get the deps
1. (optional) change the region in the `package.json` config section
2. run `npm run create` to deploy a test lambda
3. run `npm run serve` to run the web site on port 8080
4. open http://localhost:8080 -- fill in some data into the form and submit

## change the test

* change the lambda code in `api.js` and run `npm run update` to redeploy
* change the web site code in `web.js` and re-run `npm run serve` to recompile the javascript

## clean up after test

* `npm run destroy` to remove the API
