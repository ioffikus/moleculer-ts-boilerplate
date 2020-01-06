import util from 'util';
import { get } from 'lodash';

const createLogMessage = (ctx: any, err: any) => {
  const serviceName = get(ctx, 'service.name', '');
  const requestID = ctx.requestID;
  const params = ctx.params;
  const level = ctx.level;
  const nodeID = ctx.nodeID;
  const startTime = ctx.startTime;
  const startHrTime = ctx.startHrTime;
  const stopTime = ctx.stopTime;
  const duration = ctx.duration;
  const action = get(ctx, 'action.name', '');
  const endpointName = get(ctx, 'endpoint.name', '');
  const errorName = err.name || get(err, 'constructor.name', null);

  return {
    serviceName,
    requestID,
    params,
    level,
    nodeID,
    startTime,
    stopTime,
    startHrTime,
    duration,
    action,
    endpointName,
    errorName,
    error: util.inspect(err, {
      showHidden: false,
      depth: 5,
      colors: false,
      maxArrayLength: 1000,
      getters: false,
      sorted: false,
    }),
  };
};

export function hooksErrorHandler(ctx, err) {
  // выводи в режиме debug все перехваченные ошибки
  this.logger.debug(createLogMessage(ctx, err));

  throw err;
}
