import dotenv from 'dotenv';
import globalConfig from 'src/global.config';
import { dropRight } from 'lodash';
import path from 'path';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: envFile });

export const restPort = process.env.REST_PORT || 3000;

export const rootDir = dropRight(__dirname.split(path.sep), 2).join(path.sep);

export const isShowDocs = parseInt(process.env.IS_SHOW_DOCS, 10) || 1;

export default {
  ...globalConfig,
  restPort,
  rootDir,
  isShowDocs,
};
