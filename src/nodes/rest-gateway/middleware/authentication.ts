import { MRequest } from '../app';
import { AccessControl } from 'accesscontrol';
import { createError } from 'src/utils/errors';
import { grantsObject } from 'src/roles.config';
import { INVALID_TOKEN, NOT_GRANTED } from '../services/error-codes.config';

const ac = new AccessControl(grantsObject);

export async function expressAuthentication(
  req: MRequest,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  let tokenData;

  req.locale.language = 'ru';
  try {
    const token =
      req.body.accessToken ||
      req.query.access_token ||
      req.headers['x-access-token'] ||
      req.cookies['accessToken'];

    tokenData = await req.broker.call('tokens.checkToken', { token, ...req.useragent });

    // добавляем в request accountId для использования в роутах
    req.accountId = tokenData.accountId;
  } catch (e) {
    return Promise.reject(createError(INVALID_TOKEN));
  }

  try {
    const [resource, action] = scopes[0].split(':');

    const { role } = await req.broker.call('accounts.get', { id: tokenData.accountId });

    const permission = ac.can(role)[action](resource);

    if (!permission.granted) {
      return Promise.reject(createError(NOT_GRANTED));
    }

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(createError(NOT_GRANTED));
  }
}
