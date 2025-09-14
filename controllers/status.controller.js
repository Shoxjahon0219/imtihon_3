const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Status = require("../models/status");

const CreateStatus = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newStatus = await Status.create({
      name,
      description,
    });

    res.status(201).send({
      message: "New Status сreated successfuly",
      data: newStatus,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllStatus = async (req, res) => {
  try {
    const statuses = await Status.findAll();

    res.status(200).send({
      message: "Statuses find successfuly",
      data: statuses,
    });
  } catch (err) {
    sendErrorResponse("Statuses find error", res, 500);
  }
};

const GetOneStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await Status.findByPk(id);

    res.status(200).send({
      message: "Status fetched successfuly",
      data: status,
    });
  } catch (err) {
    sendErrorResponse("Status fetch error", res, 500);
  }
};

const UpdateStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const status = await Status.update(
      {
        name,
        description,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Status updated successfuly",
      data: status[1][0],
    });
  } catch (err) {
    sendErrorResponse("Status updated error", res, 500);
  }
};

const DeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await Status.destroy({ where: { id } });

    res.status(200).send({
      message: "Status deleted successfuly",
      data: status,
    });
  } catch (err) {
    sendErrorResponse("Status deleted error", res, 500);
  }
};

module.exports = {
  CreateStatus,
  GetAllStatus,
  GetOneStatus,
  UpdateStatus,
  DeleteStatus,
};
