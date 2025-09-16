const joi = require("joi");

const statusValidator = joi.object({
  name: joi.string().min(3).max(30).required(),
  description: joi.string().min(3),
});

module.exports = { statusValidator };
