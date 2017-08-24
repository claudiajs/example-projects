'use strict';
// Node deps

// external deps

// local deps
const { app } = require('./build/server/bundle');
const { serverPort } = require('./build/server/bundle');

app.listen(serverPort, () => {
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log(r.route.path)
        }
    });
    console.log(`HumansForget listening on port ${serverPort}!`);
    // opens the url in the default browser
    // opn('http://localhost:3000', { app: ['google chrome'] });
});
