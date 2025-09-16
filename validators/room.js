const joi = require("joi");

const roomValidator = joi.object({
  name: joi.string().max(50).required(),
  floor: joi.number().integer().required(),
});

module.exports = { roomValidator };
