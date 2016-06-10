/*global module*/
'use strict';
const builder = require('claudia-bot-builder'),
  ws = require('./src/ws'),
  eTitle = entity => ((entity.label || '') + ' ' + (entity.description || ''));
module.exports = builder(request => {
  console.log('received', request);
  return ws.findEntities(request.text).then(r => r.results).then(entities => {
    if (!entities.length) {
      return `Unfortunately, could not find anything about ${request.text} in Wikidata`;
    } else if (entities.length === 1) {
      let title = 'Facts about ' + eTitle(entities[0]);
      return ws.entityClaims(entities[0].id).then(claims => title + ':\n' + claims.join('\n'));
    } else {
      return {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: entities.slice(0, 9).map(entity => ({
              title: entity.label,
              subtitle: entity.description,
              buttons: [{
                type: 'postback',
                title: 'View Facts',
                payload: entity.id
              }]
            }))
          }
        }
      };
    }
  });
});
