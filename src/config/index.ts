import dotenv from 'dotenv';

const envFile: string = `.env.${process.env.NODE_ENV || 'development'}.local`;

dotenv.config({ path: envFile });

export const { PORT, NODE_ENV } = process.env;
