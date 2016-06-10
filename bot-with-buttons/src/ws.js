/*global module */
const wikidata = require('wikidata-search'),
  wsPromiseWrap = require('./ws-promise-wrap');

module.exports = {
  findEntities(title) {
    var ws = new wikidata.WikidataSearch();
    ws.searchPromise = wsPromiseWrap(ws.search);
    ws.set('search', title);
    return ws.searchPromise();
  },
  entityClaims (entityId) {
    var ws = new wikidata.WikidataSearch();
    ws.getEntitiesPromise = wsPromiseWrap(ws.getEntities);
    return ws.getEntitiesPromise([entityId], true).then(res =>
        res && res.entities && res.entities[0] && res.entities[0].claims &&
          res.entities[0].claims.map(t => t.property + ': ' + t.value)
    );
  }
};
