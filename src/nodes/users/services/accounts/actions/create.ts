import { Context, Action } from 'moleculer';
import { Account } from '../account.model';

export interface CreateParams {
  phone: string;
  password: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
}

export const create: Action = {
  params: {},

  async handler(ctx: Context<CreateParams>): Promise<Account> {
    // eslint-disable-next-line no-console
    console.log(ctx.params);

    return true as Account;
  },
};
