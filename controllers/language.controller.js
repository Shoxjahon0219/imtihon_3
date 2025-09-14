const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Language = require("../models/language");

const CreateLanguage = async (req, res) => {
  try {
    const { name, code } = req.body;

    const newLanguage = await Language.create({
      name,
      code,
    });

    res.status(201).send({
      message: "New Language сreated successfuly",
      data: newLanguage,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllLanguage = async (req, res) => {
  try {
    const languages = await Language.findAll();

    res.status(200).send({
      message: "Languages find successfuly",
      data: languages,
    });
  } catch (err) {
    sendErrorResponse("Languages find error", res, 500);
  }
};

const GetOneLanguage = async (req, res) => {
  try {
    const { id } = req.params;

    const language = await Language.findByPk(id);

    res.status(200).send({
      message: "Language fetched successfuly",
      data: language,
    });
  } catch (err) {
    sendErrorResponse("Language fetch error", res, 500);
  }
};

const UpdateLanguage = async (req, res) => {
  try {
    const { name, code } = req.body;
    const { id } = req.params;

    const language = await Language.update(
      {
        name,
        code,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Language updated successfuly",
      data: language[1][0],
    });
  } catch (err) {
    sendErrorResponse("Language updated error", res, 500);
  }
};

const DeleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;

    const language = await Language.destroy({ where: { id } });

    res.status(200).send({
      message: "Language deleted successfuly",
      data: language,
    });
  } catch (err) {
    sendErrorResponse("Language deleted error", res, 500);
  }
};

module.exports = {
  CreateLanguage,
  GetAllLanguage,
  GetOneLanguage,
  UpdateLanguage,
  DeleteLanguage,
};
