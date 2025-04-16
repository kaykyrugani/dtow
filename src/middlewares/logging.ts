import morgan from 'morgan';
import { logger } from '../utils/logger';

export const loggingMiddleware = () => {
  return morgan('combined', {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  });
}; 