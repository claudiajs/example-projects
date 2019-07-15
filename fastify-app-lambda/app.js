const fastify = require('fastify');

const app = fastify();
app.get('/', (request, reply) => reply.send({ hello: 'world' }));

if (require.main !== module) {
  // called directly i.e. "node app"
  app.listen(3000, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = app;
}