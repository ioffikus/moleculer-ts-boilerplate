import dotenv from 'dotenv';
import { random } from 'lodash';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: envFile });

// seconds
const days30s = 2592000;
const days60s = days30s * 2;

export const env = process.env.NODE_ENV;
export const { pid } = process;
export const nodeID = `${env}-${pid.toString()}-random:${random(1000)}`;

export const redis = {
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
};

export const transporter = process.env.TRANSPORTER || redis.url;

export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/data',
  options: {
    useUnifiedTopology: true,
  },
};

export const isHotReload = process.argv.indexOf('--hot') !== -1;

export const log: any = {
  level: process.env.LOG_LEVEL || 'error',
  isPrettyPrint: process.env.PRETTY_PRINT === 'true',
};

export const dbPrefix = env;

export const jwt = {
  secret: process.env.JWT_SECRET || 'super secret',
  accessExpires: parseInt(process.env.JWT_ACCESS_EXPIRES, 10) || days60s,
  refreshExpires: parseInt(process.env.JWT_REFRESH_EXPIRES, 10) || days60s,
};

export const defaultTimerExpired = parseInt(process.env.DEFAULT_EXPIRED, 10) || days30s;

// сообщения отправляются с флагом test по умолчанию и логируются в консоль
// для отладки
export const isSMSDebug = process.env.IS_SMS_DEBUG || 0;

const globalConfig = {
  pid,
  nodeID,
  env,
  redis,
  mongo,
  transporter,
  log,
  dbPrefix,
  jwt,
  defaultTimerExpired,
  isSMSDebug,
  isHotReload,
};

export default globalConfig;
