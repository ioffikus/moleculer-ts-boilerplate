import moment from 'moment';
import { Get, Route, Request, Tags, Security } from 'tsoa';
import { MRequest } from '../app';

const getLogDate = () => moment().format('DD-MM-YYYY HH:mm:ss');

@Tags('Common')
@Route('node')
export class NodeController {
  /**
   * @summary It returns the health info of local node (including process & OS information).
   * @param request
   */
  @Get('health')
  public async health(@Request() request: MRequest) {
    const { broker } = request;

    return await broker.call('$node.health');
  }

  /**
   * @summary It lists all registered services (local & remote).
   * @param request
   */
  @Get('services')
  @Security('jwt', ['nodes:readAny'])
  public async services(@Request() request: MRequest) {
    const { broker } = request;

    return await broker.call('$node.services');
  }

  /**
   * @summary It lists all known nodes (including local node).
   * @param request
   */
  @Get('list')
  @Security('jwt', ['nodes:readAny'])
  public async list(@Request() request: MRequest) {
    const { broker } = request;

    return await broker.call('$node.list');
  }

  /**
   * @summary Send test logs
   * @param message - message text in log
   */
  @Get('logs/{message}')
  @Security('jwt', ['nodes:readAny'])
  public async messageToLog(message: string): Promise<any> {
    const logMessage = `${message} ${getLogDate()}`;

    // eslint-disable-next-line no-console
    console.warn(logMessage);
    // eslint-disable-next-line no-console
    console.error(logMessage);
    // eslint-disable-next-line no-console
    console.info(logMessage);
    // eslint-disable-next-line no-console
    console.debug(logMessage);

    return Promise.resolve({ msg: 'logs sended' });
  }
}
