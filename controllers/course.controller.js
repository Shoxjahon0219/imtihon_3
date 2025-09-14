const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Course = require("../models/course");
const Language = require("../models/language.js");

const CreateCourse = async (req, res) => {
  try {
    const { name, language_id, price } = req.body;

    const newCourse = await Course.create({
      name,
      price,
      language_id,
    });

    res.status(201).send({
      message: "New Course сreated successfuly",
      data: newCourse,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllCourse = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Language,
          attributes: ["name", "code"],
        },
      ],
    });

    res.status(200).send({
      message: "Courses find successfuly",
      data: courses,
    });
  } catch (err) {
    sendErrorResponse("Courses find error", res, 500);
  }
};

const GetOneCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id, {
      include: [
        {
          model: Language,
          attributes: ["name", "code"],
        },
      ],
    });

    res.status(200).send({
      message: "Course fetched successfuly",
      data: course,
    });
  } catch (err) {
    sendErrorResponse("Course fetch error", res, 500);
  }
};

const UpdateCourse = async (req, res) => {
  try {
    const { name, price, language_id } = req.body;
    const { id } = req.params;

    const course = await Course.update(
      {
        name,
        price,
        language_id,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Course updated successfuly",
      data: course[1][0],
    });
  } catch (err) {
    sendErrorResponse("Course updated error", res, 500);
  }
};

const DeleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.destroy({ where: { id } });

    res.status(200).send({
      message: "Course deleted successfuly",
      data: course,
    });
  } catch (err) {
    sendErrorResponse("Course deleted error", res, 500);
  }
};

module.exports = {
  CreateCourse,
  GetAllCourse,
  GetOneCourse,
  UpdateCourse,
  DeleteCourse,
};
