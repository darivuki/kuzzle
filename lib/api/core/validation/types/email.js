var
  util = require('util'),
  BaseConstructor = require('../baseType'),
  validator = require('validator');

/**
 * @constructor
 */
function EmailType () {
  this.typeName = 'email';
  this.allowChildren = false;
  this.allowedTypeOptions = ['notEmpty'];
}

util.inherits(EmailType, BaseConstructor);

/**
 * @param {TypeOptions} typeOptions
 * @param {*} fieldValue
 * @param {string[]} errorMessages
 */
EmailType.prototype.validate = function emailTypeValidate (typeOptions, fieldValue, errorMessages) {
  if (typeof fieldValue !== 'string') {
    errorMessages.push('The field must be a string.');
    return false;
  }

  if (fieldValue.length === 0) {
    if (typeOptions.notEmpty) {
      errorMessages.push('The string must not be empty.');
      return false;
    }
    return true;
  }

  if (!validator.isEmail(fieldValue)) {
    errorMessages.push('The string must be a valid email address.');
    return false;
  }

  return true;
};

/**
 * @param {TypeOptions} typeOptions
 * @return {boolean|TypeOptions}
 * @throws InternalError
 */
EmailType.prototype.validateFieldSpecification = function emailTypeValidateFieldSpecification (typeOptions) {
  if (typeOptions.hasOwnProperty('notEmpty') && typeof typeOptions.notEmpty !== 'boolean') {
    return false;
  }

  if (!typeOptions.hasOwnProperty('notEmpty')) {
    typeOptions.notEmpty = false;
  }

  return typeOptions;
};

module.exports = EmailType;