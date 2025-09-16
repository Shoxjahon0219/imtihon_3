const { sendErrorResponse } = require("../helpers/send.error.response.js");

const Group = require("../models/group");
const Course = require("../models/course");
const Teacher = require("../models/teacher");
const Room = require("../models/room.js");

const CreateGroup = async (req, res) => {
  try {
    const {
      name,
      level,
      is_active,
      start_time,
      stop_time,
      course_id,
      teacher_id,
      room_id,
    } = req.body;

    const newGroup = await Group.create({
      name,
      level,
      is_active,
      start_time,
      stop_time,
      course_id,
      teacher_id,
      room_id,
    });

    res.status(201).send({
      message: "New Group сreated successfuly",
      data: newGroup,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllGroup = async (req, res) => {
  try {
    const payments = await Group.findAll({
      include: [
        {
          model: Course,
          attributes: ["name", "price"],
        },
        {
          model: Teacher,
          attributes: ["full_name", "phone_number", "email"],
        },
        { model: Room, attributes: ["name", "floor"] },
      ],
    });

    res.status(200).send({
      message: "Groups find successfuly",
      data: payments,
    });
  } catch (err) {
    sendErrorResponse("Groups find error", res, 500);
  }
};

const GetOneGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Group.findByPk(id, {
      include: [
        {
          model: Course,
          attributes: ["name", "price"],
        },
        {
          model: Teacher,
          attributes: ["full_name", "phone_number", "email"],
        },
        { model: Room, attributes: ["name", "floor"] },
      ],
    });

    res.status(200).send({
      message: "Group fetched successfuly",
      data: payment,
    });
  } catch (err) {
    sendErrorResponse("Group fetch error", res, 500);
  }
};

const UpdateGroup = async (req, res) => {
  try {
    const {
      name,
      level,
      is_active,
      start_time,
      stop_time,
      course_id,
      teacher_id,
      room_id,
    } = req.body;
    const { id } = req.params;

    const payment = await Group.update(
      {
        name,
        level,
        is_active,
        start_time,
        stop_time,
        course_id,
        teacher_id,
        room_id,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Group updated successfuly",
      data: payment[1][0],
    });
  } catch (err) {
    sendErrorResponse("Group updated error", res, 500);
  }
};

const DeleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Group.destroy({ where: { id } });

    res.status(200).send({
      message: "Group deleted successfuly",
      data: payment,
    });
  } catch (err) {
    sendErrorResponse("Group deleted error", res, 500);
  }
};

module.exports = {
  CreateGroup,
  GetAllGroup,
  GetOneGroup,
  UpdateGroup,
  DeleteGroup,
};
