const joi = require("joi");

const contractValidator = joi.object({
  group_id: joi.number().min(0).integer().required(),
  student_id: joi.number().min(0).integer().required(),
  status_id: joi.number().min(0).integer().required(),
  total_price: joi.number().min(0).required(),
});

module.exports = { contractValidator };
