const joi = require("joi");

const courseValidator = joi.object({
  name: joi.string().min(3).max(50).required(),
  price: joi.number().min(0).required(),
  language_id: joi.number().min(0).integer().required(),
  duration: joi.number().min(1).required(),
});

module.exports = { courseValidator };
