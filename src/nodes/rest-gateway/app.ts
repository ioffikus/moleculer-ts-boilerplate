import methodOverride from 'method-override';
import express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from './routes';
import { ServiceBroker } from 'moleculer';
import swaggerUI from 'swagger-ui-express';
import { isShowDocs } from './config';
import userAgent from 'express-useragent';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import createLocaleMiddleware from 'express-locale';
import YAML from 'yamljs';
import { removePropsDeep } from 'src/utils/removePropsDeep';

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './controllers/node.ctrl';

// express.Request with Moleculer broker
export type MRequest = express.Request & {
  broker: ServiceBroker;
  useragent: {
    isMobile?: boolean;
    isDesktop?: boolean;
    isBot?: boolean;
    browser?: string;
    version?: string;
    os?: string;
    platform?: string;
    source?: string;
  };
  locale: {
    source: string;
    language: string;
    region: string;
  };
  accountId?: string;
};

const startSwagger = app => {
  try {
    const swaggerDoc = require('./swagger/swagger.json');

    // baseUrl в конфиге не работает, всегда генерирует с https://
    swaggerDoc.servers[0].url = '/';

    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    const withoutSecurity = removePropsDeep(swaggerDoc, ['security', 'operationId']);

    const yaml = YAML.stringify(withoutSecurity);

    app.get('/swagger.yaml', (req, res) => {
      res.header('Content-Type', 'text/yaml');
      res.end(yaml);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const createApp = async (broker: ServiceBroker) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.json({
      limit: '50MB',
    }),
  );
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(userAgent.express());
  app.use(createLocaleMiddleware());

  app.use((req: MRequest, res, next) => {
    req.broker = broker;

    next();
  });

  if (isShowDocs === 1) {
    startSwagger(app);
  }

  RegisterRoutes(app);

  app.use(errorHandler);

  return app;
};
