import { Errors } from 'moleculer';

export const createError = (
  code: {
    message: string;
    code: number;
    type: string;
  },
  data?: any,
) => {
  return new Errors.MoleculerError(code.message, code.code, code.type, data);
};
