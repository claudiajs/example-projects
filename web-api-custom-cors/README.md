A simple example demonstrating how to control CORS allowed origins and headers in API responses.

1. run `npm install` to grab the dependencies
2. run `npm start` to set up the lambda project under the default name on AWS 
3. Check out the API ID in `claudia.json` (the previous step creates the file)
4. execute OPTIONS with a domain that does not belong to claudiajs.com, and you should see an empty `Access-Control-Allow-Origin` header
  ```bash
  curl -X OPTIONS -H 'Origin: https://www.example.com' -i https://<API-ID>.execute-api.us-east-1.amazonaws.com/latest/echo
  ```
5. try again, but use a subdomain of `claudiajs.com` and you'll see that domain in the allowed origins
  ```bash
  curl -X OPTIONS -H 'Origin: https://www.example.claudiajs.com' -i https://<API-ID>.execute-api.us-east-1.amazonaws.com/latest/echo
  ```

Check out [web.js](web.js) to see how the paths are set up. For more information, see the [Claudia Api Builder](https://github.com/claudiajs/claudia-api-builder) documentation.

