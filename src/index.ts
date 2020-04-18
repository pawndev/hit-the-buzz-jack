import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
import socketIo, { Socket } from 'socket.io';
import { logger } from './providers/logger';
import { registerRoutes } from './routes/views';
import config from './config';
import { IoEvent } from './enums/socketio';
import { Data } from './data';
import path from 'path';
import { User } from "./data/user";

const data = new Data();
const server = fastify({ logger: logger });
const io = socketIo(server.server);

server.register(registerRoutes, { data, config: config.application });
server.register(pointOfView, {
  engine: {
    ejs: require('ejs'),
    production: false
  },
});
logger.debug(path.join(__dirname, 'public'));
server.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
});

io.on(IoEvent.CONNECTION, (socket: Socket) => {
  socket.on(IoEvent.JOIN, (user: { id: string; name: string; team: string; }) => {
    const u = new User(user.id, user.name)
    data.addUser(u, user.team);
    io.emit(IoEvent.ACTIVE, data.getData());
    logger.info(`New user ${user.name} joined the game!`);
  });

  socket.on(IoEvent.BUZZ, (user: { id: string; name: string; team: string }) => {
    data.buzzes.add(`${user.name}-${user.team}`);
    io.emit(IoEvent.BUZZES, data.getBuzzes());
    logger.info(`${user.name} buzzed in!`);
  });

  socket.on(IoEvent.INCREMENT_POINT, ({ team }: { team: string; }) => {
    data.incrementPoint(team);
    io.emit(IoEvent.SCORE_CHANGE, data.getData());
  })

  socket.on(IoEvent.DECREMENT_POINT, ({ team }: { team: string; }) => {
    data.decrementPoint(team);
    io.emit(IoEvent.SCORE_CHANGE, data.getData());
  })

  socket.on(IoEvent.CLEAR, () => {
    data.resetBuzzes();
    io.emit('buzzes', data.getBuzzes());
    logger.info('Clear buzzes');
  });
});

const start = async () => {
  try {
    await server.listen(config.server.port, config.server.address);
  } catch (err) {
    logger.info(err);
    process.exit(1);
  }
};

server.setNotFoundHandler((request, reply) => {
  server.log.debug('Route not found: ', request.req.url);

  reply.status(404).send({ message: 'Not found' });
});

server.setErrorHandler((error, request, reply) => {
  server.log.debug(`Request url: `, request.req.url);
  server.log.debug(`Payload: `, request.body);
  server.log.error(`Error occurred: `, error);

  reply.status(error.statusCode || 500).send({ message: error.message || 'Error occurred during request' });
});

process.on('uncaughtException', error => {
  logger.error('UncaughException: ', error);
});
process.on('unhandledRejection', reason => {
  logger.error('UnhandledRejection: ', reason);
});

start().then(_ => logger.info(`Server listening on ${config.server.port}`));
