'use strict'

const botBuilder = require('claudia-bot-builder')

const api = botBuilder(message => message.text + ' is spelled ' + message.text.toUpperCase().split('').join(' '))

api.post('/alexa1', request => {
  console.log('Alexa', request.rawBody)
  return ({
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless. Can I help you with anything else?"
      },
      "card": {
        "type": "Simple",
        "title": "Horoscope",
        "content": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
      },
      "shouldEndSession": false
    }
  })
})

module.exports = api
