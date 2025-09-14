const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Contract = require("../models/contract.js");
const Group = require("../models/group.js");
const Status = require("../models/status.js");
const Student = require("../models/student.js");

const CreateContract = async (req, res) => {
  try {
    const { group_id, student_id, status_id, total_price } = req.body;

    const newContract = await Contract.create({
      group_id,
      student_id,
      status_id,
      total_price,
    });

    res.status(201).send({
      message: "New Contract сreated successfuly",
      data: newContract,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllContract = async (req, res) => {
  try {
    const courses = await Contract.findAll({
      include: [
        {
          model: Group,
          attributes: ["name", "level"],
        },
        {
          model: Student,
          attributes: ["full_name", "email", "phone_number"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).send({
      message: "Contracts find successfuly",
      data: courses,
    });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const GetOneContract = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Contract.findByPk(id, {
      include: [
        {
          model: Group,
          attributes: ["name", "level"],
        },
        {
          model: Student,
          attributes: ["full_name", "email", "phone_number"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).send({
      message: "Contract fetched successfuly",
      data: course,
    });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const UpdateContract = async (req, res) => {
  try {
    const { group_id, student_id, status_id, total_price } = req.body;
    const { id } = req.params;

    const course = await Contract.update(
      {
        group_id,
        student_id,
        status_id,
        total_price,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Contract updated successfuly",
      data: course[1][0],
    });
  } catch (err) {
    sendErrorResponse("Contract updated error", res, 500);
  }
};

const DeleteContract = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Contract.destroy({ where: { id } });

    res.status(200).send({
      message: "Contract deleted successfuly",
      data: course,
    });
  } catch (err) {
    sendErrorResponse("Contract deleted error", res, 500);
  }
};

module.exports = {
  CreateContract,
  GetAllContract,
  GetOneContract,
  UpdateContract,
  DeleteContract,
};
