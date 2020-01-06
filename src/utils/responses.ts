import { Errors } from 'moleculer';
import { get } from 'lodash';
import { ValidationError } from 'fastest-validator';
import { ValidateError } from 'tsoa';
import {
  CRITICAL_ERROR,
  MOLECULER_ERROR,
  JSON_SYNTAX_ERROR,
  TSOA_VALIDATION,
  VALIDATION_ERROR,
  UNKNOW_ERROR,
  MONGOOSE_VALIDATION_ERROR,
  MONGOOSE,
} from 'src/error-codes.config';

export const sucessResponse = <T>(results: T) => ({
  success: true,
  statusCode: 200,
  results,
});

export const typeErrorResponse = (error: any) => {
  return {
    success: false,
    statusCode: 500,
    results: {
      type: CRITICAL_ERROR.type,
      data: {
        message: error.message || error.toString(),
        stack: error.stack,
      },
    },
  };
};

export const moleculerErrorResponse = (error: Errors.MoleculerError) => {
  return {
    success: false,
    statusCode: error.code || 400,
    results: {
      type: get(error, 'type', MOLECULER_ERROR.type),
      data: [get(error, 'data', {})],
      message: error.message || error.toString(),
    },
  };
};

export const tsoaSyntaxErrorResponse = (error: any) => {
  /**
   * {
   *    expose: true,
        statusCode: 400,
        status: 400,
        body: '{\n  "accountId": "abc",\n"status": "abc",  \n}',
        type: 'entity.parse.failed'
      }
   */
  return {
    success: false,
    statusCode: error.status || 400,
    results: {
      type: JSON_SYNTAX_ERROR.type,
      data: error.body,
      message: error.message || error.toString(),
    },
  };
};

export const tsoaValidateErrorResponse = (error: ValidateError) => {
  /**
   * ValidateError {
        fields: {
          'model.status': { message: "'status' is required", value: undefined }
        },
        message: '',
        status: 400,
        name: 'ValidateError'
      }
   */

  const items = get(error, 'fields', {});

  const errors = Object.keys(items).map(key => {
    return {
      expected: '',
      actual: get(items, `${key}.value`, ''),
      value: get(items, `${key}.value`, ''),
      path: key,
      type: get(items, `${key}.name`, ''),
      message: get(items, `${key}.message`, ''),
    };
  });

  return {
    success: false,
    statusCode: error.status || 400,
    results: {
      type: TSOA_VALIDATION.type,
      errors,
      message: error.message || error.toString(),
    },
  };
};

export const validationErrorResponse = (error: Errors.ValidationError) => {
  const { data = [] } = error;
  const errors = [];

  data.forEach((item: ValidationError) => {
    errors.push({
      message: item.message,
      type: item.type,
      field: item.field,
      actual: item.actual,
    });
  });

  return {
    success: false,
    statusCode: error.code || 400,
    results: {
      type: VALIDATION_ERROR.type,
      errors,
      message: error.message || error.toString(),
    },
  };
};

export const unknownErrorResponse = (error: any) => {
  return {
    success: false,
    statusCode: error.code || 500,
    results: {
      type: get(error, 'type', UNKNOW_ERROR.type),
      data: [get(error, 'data', null)],
      message: error.message || error.toString(),
    },
  };
};

export const mongooseErrorResponse = (error: any) => {
  /**
   * errors: {
        accountId: MongooseError {
          stringValue: '"abc"',
          kind: 'ObjectID',
          value: 'abc',
          path: 'accountId',
          reason: [MongooseError],
          message: 'Cast to ObjectID failed for value "abc" at path "accountId"',
          name: 'CastError'
        }
      },
      _message: 'Payment validation failed',
      name: 'ValidationError'
   */

  let errors = [];
  const items = get(error, 'errors', []);

  if (errors.length > 0) {
    /**
   *  stringValue: '"abc"',
      kind: 'ObjectID',
      value: 'abc',
      path: 'accountId',
   */
    errors = Object.keys(items).map(key => {
      return {
        expected: get(items, `${key}.kind`, ''),
        actual: get(items, `${key}.value`, ''),
        value: get(items, `${key}.value`, ''),
        path: get(items, `${key}.path`, ''),
        type: get(items, `${key}.name`, ''),
        message: get(items, `${key}.message`, ''),
      };
    });

    return {
      success: false,
      statusCode: 400,
      results: {
        type: MONGOOSE_VALIDATION_ERROR.type,
        errors,
        message: get(error, '_message', error.toString()),
      },
    };
  }

  return {
    success: false,
    statusCode: 400,
    results: {
      type: MONGOOSE.type,
      errors: [
        {
          expected: get(error, `kind`, ''),
          actual: get(error, `value`, ''),
          value: get(error, `value`, ''),
          path: get(error, `path`, ''),
          type: get(error, `name`, ''),
          message: get(error, `message`, ''),
        },
      ],
      message: error.message || error.toString(),
    },
  };
};
