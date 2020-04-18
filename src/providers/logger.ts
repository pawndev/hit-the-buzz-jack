import pino from 'pino';
import config from '../config';

export const createLogger = () =>
  pino({
    prettyPrint: config.logger.devMode,
    timestamp: false,
  });

export const logger = createLogger();
