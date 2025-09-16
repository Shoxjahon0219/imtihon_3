const { sendErrorResponse } = require("../helpers/send.error.response");
const Group = require("../models/group");
const Status = require("../models/status");
const Student = require("../models/student");

const { Op } = require("sequelize");
const Teacher = require("../models/teacher");
const Payment = require("../models/payment");
const Contract = require("../models/contract");
const Course = require("../models/course");

const smartQuery1 = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    const contracts = await Contract.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)],
        },
      },
      include: [
        {
          model: Student,
          attributes: ["full_name", "phone_number", "email"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
        {
          model: Group,
          attributes: ["name", "level"],
        },
      ],
    });

    res.status(200).send({
      message: "Contracts fetched successfully",
      data: contracts,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const smartQuery2 = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    const contracts = await Contract.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)],
        },
      },
      include: Student,
      attributes: [],
    });

    res.status(200).send({
      message: "Contracts fetched successfully",
      data: contracts,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const smartQuery3 = async (req, res) => {
  try {
    const { start_date, end_date, status_id } = req.body;

    const contracts = await Contract.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)],
        },
        status_id,
      },
      include: Student,
      attributes: [],
    });

    res.status(200).send({
      message: "Contracts fetched successfully",
      data: contracts,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const smartQuery4 = async (req, res) => {
  try {
    const { course_id } = req.body;

    const groups = await Group.findAll({
      where: {
        course_id,
      },
      include: {
        model: Teacher,
        attributes: ["full_name", "phone_number", "email", "is_head_mentor"],
      },
      attributes: ["name", "level", "count_students"],
    });

    res.status(200).send({
      message: "Contracts fetched successfully",
      data: groups,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const smartQuery5 = async (req, res) => {
  try {
    const { student_id } = req.body;

    const contracts = await Contract.findAll({
      where: {
        student_id,
      },
    });

    const payments = await Payment.findAll({
      where: {
        contract_id: contracts.map((c) => c.id),
      },
      attributes: ["amount", "createdAt"],
      include: {
        model: Contract,
        attributes: ["total_price"],
        include: {
          model: Group,
          attributes: ["course_id"],
          include: [
            {
              model: Course,
              attributes: ["name", "duration", "price"],
            },
            {
              model: Teacher,
              attributes: ["full_name", "phone_number", "email"],
            },
          ],
        },
      },
    });

    res.status(200).send({
      message: "Contracts fetched successfully",
      data: payments,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  smartQuery1,
  smartQuery2,
  smartQuery3,
  smartQuery4,
  smartQuery5,
};
