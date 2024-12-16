/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./Routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  await server.start();
  console.log(`Server dijalankan pada ${server.info.uri}`);
};

init();
