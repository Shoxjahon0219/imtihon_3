const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Language = require("../models/language.js");
const Teacher = require("../models/teacher.js");
const bcrypt = require("bcrypt");

const CreateTeacher = async (req, res) => {
  try {
    const {
      full_name,
      password,
      phone_number,
      email,
      is_head_mentor,
      language_id,
    } = req.body;

    const candidate = await Teacher.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Email is unique" }, res, 403);
    }

    const hashedPass = await bcrypt.hash(password, 7);

    const newTeacher = await Teacher.create({
      full_name,
      password: hashedPass,
      phone_number,
      email,
      is_head_mentor,
      language_id,
    });

    res.status(201).send({
      message: "New Teacher сreated successfuly",
      data: newTeacher,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: [
        {
          model: Language,
          attributes: ["name", "code"],
        },
      ],
    });

    res.status(200).send({
      message: "Teachers find successfuly",
      data: teachers,
    });
  } catch (err) {
    sendErrorResponse("Teachers find error", res, 500);
  }
};

const GetOneTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id, {
      include: [
        {
          model: Language,
          attributes: ["name", "code"],
        },
      ],
    });

    res.status(200).send({
      message: "Teacher fetched successfuly",
      data: teacher,
    });
  } catch (err) {
    sendErrorResponse("Teacher fetch error", res, 500);
  }
};

const UpdateTeacher = async (req, res) => {
  try {
    const {
      full_name,
      password,
      phone_number,
      email,
      is_head_mentor,
      language_id,
    } = req.body;
    const { id } = req.params;

    const hashedPass = await bcrypt.hash(password, 7);

    const teacher = await Teacher.update(
      {
        full_name,
        password: hashedPass,
        phone_number,
        email,
        is_head_mentor,
        is_creater,
        language_id,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Teacher updated successfuly",
      data: teacher[1][0],
    });
  } catch (err) {
    sendErrorResponse("Teacher updated error", res, 500);
  }
};

const DeleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.destroy({ where: { id } });

    res.status(200).send({
      message: "Teacher deleted successfuly",
      data: teacher,
    });
  } catch (err) {
    sendErrorResponse("Teacher deleted error", res, 500);
  }
};

module.exports = {
  CreateTeacher,
  GetAllTeacher,
  GetOneTeacher,
  UpdateTeacher,
  DeleteTeacher,
};
