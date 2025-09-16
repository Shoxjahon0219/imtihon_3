const joi = require("joi");

const groupValidator = joi.object({
  name: joi.string().min(3).max(50).required(),
  description: joi.string().min(3),
  level: joi.string().min(2).max(10).required(),
  is_active: joi.boolean(),
  start_time: joi.string().required(),
  stop_time: joi.string().required(),
  course_id: joi.number().min(0).integer().required(),
  teacher_id: joi.number().min(0).integer().required(),
  room_id: joi.number().min(0).integer().required(),
});

module.exports = { groupValidator };
