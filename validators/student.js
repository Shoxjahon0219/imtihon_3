const joi = require("joi");

const studentValidator = joi.object({
  full_name: joi.string().max(50).required(),
  email: joi.string().email().max(50).required(),
  phone_number: joi.string().max(15).required(),
  password: joi.string().min(8).max(50).required(),
  is_active: joi.boolean(),
});

module.exports = { studentValidator };