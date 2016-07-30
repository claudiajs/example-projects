/*global module*/
'use strict';
const builder = require('claudia-bot-builder'),
  fbTemplate = builder.fbTemplate,
  ws = require('./src/ws'),
  eTitle = entity => ((entity.label || '') + ' ' + (entity.description || '')),
  format = text => (text && text.substring(0, 80));
module.exports = builder((request, apiReq) => {
  apiReq.lambdaContext.callbackWaitsForEmptyEventLoop = false;
  return ws.findEntities(request.text).then(r => r.results).then(entities => {
    if (!entities.length) {
      return `Unfortunately, could not find anything about ${request.text} in Wikidata`;
    } else if (entities.length === 1) {
      let title = 'Facts about ' + eTitle(entities[0]);
      return ws.entityClaims(entities[0].id).then(claims => title + ':\n' + claims.join('\n'));
    } else {
      const generic = new fbTemplate.generic();
      entities.slice(0, 9).forEach(entity => {
        generic.addBubble(format(entity.label), format(entity.description))
            .addButton('View Facts', entity.id);
      });
      return generic.get();
    }
  });
});
