import * as fastify from 'fastify';
import { Data } from '../data';
import { IApplication } from '../config';

interface IOpts {
  data: Data;
  config: IApplication;
}

export const registerRoutes = (server: fastify.FastifyInstance, opts: IOpts, done: () => void) => {
  // server.get('/host/new', (request, reply) => {
  //   reply.view('/src/views/host_new.ejs', { config: opts.config, data: opts.data.getData() });
  // });
  // server.get('/login', (request, reply) => {
  //   reply.view('/src/views/login.ejs', { config: opts.config, data: opts.data.getData() });
  // });
  // server.get('/play', (request, reply) => {
  //   reply.view('/src/views/play.ejs', { config: opts.config, data: opts.data.getData() });
  // });

  server.get('/host', (request, reply) => {
    reply.view('/src/views/host_new.ejs', { config: opts.config, data: opts.data.getData() });
  });
  server.get('/', (request, reply) => {
    reply.view('/src/views/play.ejs', { config: opts.config, data: opts.data.getData() });
  });
  done();
};
