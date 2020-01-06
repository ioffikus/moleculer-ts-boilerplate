/*
import { isNaN } from 'lodash';
import { Context } from 'koa';

export const checkLimitAndOffset = async (ctx: Context, next: Function) => {
  const { limit, offset } = ctx.query;

  const intLimit = parseInt(limit, 10);
  const intOffset = parseInt(offset, 10);

  ctx.query.limit = isNaN(intLimit) ? 100 : intLimit;
  ctx.query.offset = isNaN(intOffset) ? 0 : intOffset;

  // `await next()` можно сделать только в одном месте - в глабальной
  // обработке ошибок. в остальных случаях - `return next();`
  return next(ctx);
};
*/
