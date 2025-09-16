const joi = require("joi");

const languageValidator = joi.object({
  name: joi.string().min(2).max(30).required(),
  code: joi.string().min(2).max(10).required(),
});

module.exports = { languageValidator };
