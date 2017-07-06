const fastify = require('fastify')();

fastify.get('/', (request, reply) => reply.send({ hello: 'world' }));

if (require.main === module) {
  // called directly i.e. "node app"
  fastify.listen(3000, (err) => {
    if (err) console.error(err);
    console.log(`server listening on ${fastify.server.address().port}`);
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = fastify;
}
