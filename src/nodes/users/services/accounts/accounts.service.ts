import { ServiceSchema } from 'moleculer';
// import { accountModel } from './account.model';
import { hooksErrorHandler } from 'src/utils/hooksErrorHandler';
import { logData } from './hooks/logData';
import { create } from './actions/create';
import { getPasswordHash } from './methods/getPasswordHash';

const accountsService: ServiceSchema = {
  name: 'accounts',
  // model: accountModel,
  settings: {},
  hooks: {
    after: {
      create: [logData],
    },
    error: {
      '*': hooksErrorHandler,
    },
  },
  actions: {
    create,
  },
  methods: {
    getPasswordHash,
  },
  async started() {},
};

module.exports = accountsService;
