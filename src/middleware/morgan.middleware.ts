import morgan from 'morgan';

import { NODE_ENV } from '@/config';
import logger from '@/config/logger';

const stream = {
  write: (message: string) => {
    if (message.includes(' 4') || message.includes(' 5')) {
      logger.error(message.trim());
    } else {
      logger.info(message.trim());
    }
  },
};

const skip = () => {
  return NODE_ENV === 'test';
};

const morganMiddleware = morgan(':method :url :status :response-time ms', { stream, skip });

export default morganMiddleware;
