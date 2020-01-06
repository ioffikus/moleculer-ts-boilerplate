import { get } from 'lodash';
import { MRequest } from '../app';
import express from 'express';
import {
  unknownErrorResponse,
  tsoaSyntaxErrorResponse,
  mongooseErrorResponse,
  validationErrorResponse,
  moleculerErrorResponse,
  tsoaValidateErrorResponse,
  typeErrorResponse,
} from 'src/utils/responses';

export const errorHandler = async function(
  error: any,
  req: MRequest,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
) {
  const errorName = error.name || get(error, 'constructor.name', null);

  let response;

  // console.log(error);

  switch (errorName) {
    case 'MongoError':
    case 'CastError':
      response = mongooseErrorResponse(error);
      break;
    case 'SyntaxError':
      response = tsoaSyntaxErrorResponse(error);
      break;
    case 'ValidateError':
      response = tsoaValidateErrorResponse(error);
      break;
    case 'ValidationError':
      response = validationErrorResponse(error);
      break;
    case 'MoleculerError':
    case 'EntityNotFoundError':
    case 'ServiceNotAvailableError':
      response = moleculerErrorResponse(error);
      break;
    case 'TypeError':
      req.broker.logger.error(error);
      response = typeErrorResponse(error);
      break;
    default:
      req.broker.logger.error(error);
      response = unknownErrorResponse(error);
      break;
  }

  res.status(response.statusCode || 500);
  res.json(response);
};
