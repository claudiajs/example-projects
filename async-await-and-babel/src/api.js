import API from 'claudia-api-builder'
import fetch from 'node-fetch'

const api = new API()

async function handler() {
  const response = await fetch('http://www.colourlovers.com/api/colors/random?format=json')
  const colorArray = await response.json()
  return colorArray[0]
}

api.get('/', handler)

module.exports = api
