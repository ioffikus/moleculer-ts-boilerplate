import { restPort } from '../config';
import { createApp } from '../app';
import { ServiceSchema } from 'moleculer';

const restGateway: ServiceSchema = {
  name: 'rest-gateway',
  created() {},
  async started() {
    const app = await createApp(this.broker);

    this.server = app
      .listen(restPort, () => {
        this.logger.info(`http server started at port ${restPort}`);
      })
      .on('error', this.logger.error);
  },

  async stopped() {
    await this.server.close();
  },
};

module.exports = restGateway;
