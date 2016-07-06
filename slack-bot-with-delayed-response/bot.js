'use strict'

const botBuilder = require('claudia-bot-builder')
const rp = require('minimal-request-promise')
const https = require('https')
const url = require('url')

// bot builder returns an API builder instance
const api = botBuilder((request, originalApiRequest) => {
  // Send a request to a new endpoint with a text and url in the params
  https.get(`https://${originalApiRequest.headers.Host}/${originalApiRequest.env.lambdaVersion}/delayed?text=${request.text}&url=${encodeURIComponent(request.originalRequest.response_url)}`, res => res.on('data', () => console.log('Done')))
    .on('error', e => console.error(e))

  // Wait 100ms to the request above to be sent and return instant response
  return new Promise((resolve, reject) => setTimeout(() => resolve('Immediate response'), 100))
})

// Add new method
api.get('/delayed', request => {
  // Parsing URL until we update minimal-request-promise (or use anything else)
  let options = url.parse(decodeURIComponent(request.queryString.url))
  options.method = 'POST'
  options.headers = { 'Content-Type': 'application/json' }
  options.body = JSON.stringify({ text: `Delayed response: ${request.queryString.text}` })

  // Wait 5s and make another Slack request
  return new Promise((resolve, reject) => setTimeout(() => resolve('ok'), 5000))
    .then(() => rp(options))
    .then(() => 'ok')
})

// Export an API builder instance in the end
module.exports = api
