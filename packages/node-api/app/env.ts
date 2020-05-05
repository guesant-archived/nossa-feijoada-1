import path from 'path';
import dotenv from 'dotenv';

const { NODE_ENV, USE_ENV_FILE = true } = process.env;

const ENV_FILE =
  process.env.ENV_FILE || NODE_ENV === 'development'
    ? path.resolve(__dirname, '../.env.dev')
    : path.resolve(__dirname, '../.env.prod');

export default {
  ...process.env,
  ...(USE_ENV_FILE ? dotenv.config({ path: ENV_FILE }).parsed || {} : {}),
};
