import * as dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: Number(process.env.PORT) || 3730,
  API_PREFIX: process.env.API_PREFIX || 'api',
};
