import { Validator } from 'moleculer';
import FastesValidator from 'fastest-validator';
import messages from './messages';
import phone from './phone';

class CustomValidator extends Validator {
  private validator: any;

  constructor() {
    super();

    this.validator = new FastesValidator({
      messages,
    });

    // custom validators
    this.validator.add('phone', value => phone(this.validator, value));
  }

  compile(schema) {
    return params => this.validate(params, schema);
  }

  validate(params, schema) {
    return this.validator.validate(params, schema);
  }
}

export default new CustomValidator();
