const joi = require("joi");

const paymentValidator = joi.object({
  amount: joi.number().min(0).required(),
  contract_id: joi.number().min(0).integer().required(),
});

module.exports = { paymentValidator };
