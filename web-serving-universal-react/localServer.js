'use strict';

const { app } = require('./build/server/bundle');
const { serverPort } = require('./build/server/bundle');

app.listen(serverPort, () => {
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log(r.route.path)
        }
    });
    console.log(`local app listening on port ${serverPort}!`);
});
