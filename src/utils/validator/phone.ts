import Validator from 'fastest-validator';

export default (v: Validator, value: any) => {
  const regExp = /^[1-9]{1}[0-9]{10,10}$/gm;

  if (regExp.test(value)) {
    return true;
  }

  return v.makeError('phone', null, value);
};
