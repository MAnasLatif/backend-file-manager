import { createLogger, format, transports } from 'winston';

import 'winston-daily-rotate-file';
import { NODE_ENV } from '@/config';
const { combine, timestamp, json, printf, colorize, align } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: () => new Date(Date.now()).toUTCString(),
    }),
    json(),
  ),
  silent: NODE_ENV === 'test',
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
      ),
    }),
    new transports.DailyRotateFile({
      dirname: './logs',
      filename: 'all-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
    new transports.DailyRotateFile({
      level: 'error',
      dirname: './logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
});

export default logger;
