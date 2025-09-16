const joi = require("joi");

const teacherValidator = joi.object({
  full_name: joi.string().max(50).required(),
  email: joi.string().email().max(50).required(),
  phone_number: joi.string().max(15),
  password: joi.string().min(8).max(50).required(),
  is_head_mentor: joi.boolean(),
  language_id: joi.number().min(0).integer().required(),
});

module.exports = { teacherValidator };
