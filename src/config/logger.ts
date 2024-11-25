import { createLogger, format, transports } from 'winston';

import 'winston-daily-rotate-file';
import config from '@/config';
const { combine, timestamp, json, printf, colorize, align } = format;

let logsPath = config.get('LOGS_PATH');
if (logsPath === 'default') {
  logsPath = `${config.get('DATA_FILE')}/private/logs`;
}

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: () => new Date(Date.now()).toUTCString(),
    }),
    json(),
  ),
  silent: config.isTest() || config.get('LOGS') === 'OFF',
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
      ),
    }),
    new transports.DailyRotateFile({
      dirname: logsPath,
      filename: 'all-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: config.get('LOGS_TIME'),
      zippedArchive: true,
    }),
    new transports.DailyRotateFile({
      level: 'error',
      dirname: logsPath,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: config.get('LOGS_TIME'),
      zippedArchive: true,
    }),
  ],
});

export default logger;
