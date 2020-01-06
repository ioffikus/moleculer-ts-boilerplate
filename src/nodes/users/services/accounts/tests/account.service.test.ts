import { ServiceBroker } from 'moleculer';
import brokerConfig from 'src/moleculer.config';
import { CreateParams } from '../actions/create';
import { Account } from '../account.model';

const accountsService = require('../accounts.service');

const ctx: { brokerInstance: ServiceBroker } = {
  brokerInstance: null,
};

describe('accounts service tests', () => {
  beforeAll(async () => {
    ctx.brokerInstance = new ServiceBroker({
      ...brokerConfig,
      logLevel: 'error',
    });

    await ctx.brokerInstance.createService(accountsService);

    await ctx.brokerInstance.start();
  });

  describe('create action tests', () => {
    it('create should return true', async () => {
      const result = await ctx.brokerInstance.call<Account, CreateParams>('accounts.create', {
        phone: '123456789',
        password: '123456',
      });

      expect(result).toBe(true);
    });
  });

  afterAll(async () => {
    await ctx.brokerInstance.stop();
  });
});
