const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Student = require("../models/student.js");
const bcrypt = require("bcrypt");

const CreateStudent = async (req, res) => {
  try {
    const { full_name, password, phone_number, email, is_active } = req.body;

    const candidate = await Student.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Email is unique" }, res, 403);
    }

    const hashedPass = await bcrypt.hash(password, 7);

    const newStudent = await Student.create({
      full_name,
      password: hashedPass,
      phone_number,
      email,
      is_active,
    });

    res.status(201).send({
      message: "New Student сreated successfuly",
      data: newStudent,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllStudent = async (req, res) => {
  try {
    const students = await Student.findAll();

    res.status(200).send({
      message: "Students find successfuly",
      data: students,
    });
  } catch (err) {
    sendErrorResponse("Students find error", res, 500);
  }
};

const GetOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    res.status(200).send({
      message: "Student fetched successfuly",
      data: student,
    });
  } catch (err) {
    sendErrorResponse("Student fetch error", res, 500);
  }
};

const UpdateStudent = async (req, res) => {
  try {
    const { full_name, password, phone_number, email, is_active, is_creater } =
      req.body;
    const { id } = req.params;

    const hashedPass = await bcrypt.hash(password, 7);

    const student = await Student.update(
      {
        full_name,
        password: hashedPass,
        phone_number,
        email,
        is_active,
        is_creater,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Student updated successfuly",
      data: student[1][0],
    });
  } catch (err) {
    sendErrorResponse("Student updated error", res, 500);
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.destroy({ where: { id } });

    res.status(200).send({
      message: "Student deleted successfuly",
      data: student,
    });
  } catch (err) {
    sendErrorResponse("Student deleted error", res, 500);
  }
};

module.exports = {
  CreateStudent,
  GetAllStudent,
  GetOneStudent,
  UpdateStudent,
  DeleteStudent,
};
