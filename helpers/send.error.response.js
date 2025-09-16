const logger = require("../services/logger.service");

const sendErrorResponse = (error, res, status) => {
  if (error.name == "SequelizeForeignKeyConstraintError") {
    return res.status(400).send({
      message: "Cheklov xatoligi: Tashqi kalit cheklovi buzildi",
    });
  }
  res.status(status).send({
    message: "Xatolik",
    error: error.message,
  });
};

module.exports = {
  sendErrorResponse,
};
