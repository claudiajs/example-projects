/*global module*/
const builder = require('claudia-bot-builder');
module.exports = builder(request => {
  return 'Hello ' + request.text;
});
