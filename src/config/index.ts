import dotenv from 'dotenv';

const envFile: string = `.env.${process.env.NODE_ENV || 'development'}.local`;

dotenv.config({ path: envFile });

const _config = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATA_FILE: process.env.DATA_FILE || 'storage',
  LOGS_PATH: process.env.LOGS_PATH || 'default',
  LOGS: process.env.LOGS || 'ON',
  LOGS_TIME: process.env.LOGS_TIME || '7d',
};

export default {
  get: (variableName: string): string => {
    const value: string = _config[variableName as keyof typeof _config];
    if (!value) {
      console.log(`Missing environment variable: ${variableName}`);
      process.exit();
    }
    return value;
  },
  isProd: () => _config.NODE_ENV === 'production',
  isDev: () => _config.NODE_ENV === 'development',
  isTest: () => _config.NODE_ENV === 'test',
};
