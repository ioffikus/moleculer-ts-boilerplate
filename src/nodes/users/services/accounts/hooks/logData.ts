import { Context } from 'moleculer';
import util from 'util';

export async function logData(ctx: Context, res: any) {
  // eslint-disable-next-line no-console
  console.log(`Account create data: ${util.inspect(res)}`);

  return res;
}
