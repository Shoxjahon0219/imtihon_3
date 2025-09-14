const logger = require("../services/logger.service");

const sendErrorResponse = (error, res, status) => {
  logger.error(error);
  res.status(status).send({
    message: "Xatolik",
    error: error.message,
  });

  if (error.name == "SequelizeForeignKeyConstraintError") {
    return res
      .status(400)
      .json({ message: "Cheklov xatoligi: Tashqi kalit cheklovi buzildi" });
  }
};

module.exports = {
  sendErrorResponse,
};
