import { Context } from 'moleculer';

export const create = {
  params: {},

  async handler(ctx: Context) {
    // eslint-disable-next-line no-console
    console.log(ctx.params);

    return true;
  },
};
