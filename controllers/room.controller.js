const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Room = require("../models/room");

const CreateRoom = async (req, res) => {
  try {
    const { name, floor } = req.body;

    const newRoom = await Room.create({
      name,
      floor,
    });

    res.status(201).send({
      message: "New Room сreated successfuly",
      data: newRoom,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllRoom = async (req, res) => {
  try {
    const rooms = await Room.findAll();

    res.status(200).send({
      message: "Rooms find successfuly",
      data: rooms,
    });
  } catch (err) {
    sendErrorResponse("Rooms find error", res, 500);
  }
};

const GetOneRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findByPk(id);

    res.status(200).send({
      message: "Room fetched successfuly",
      data: room,
    });
  } catch (err) {
    sendErrorResponse("Room fetch error", res, 500);
  }
};

const UpdateRoom = async (req, res) => {
  try {
    const { name, floor } = req.body;
    const { id } = req.params;

    const room = await Room.update(
      {
        name,
        floor,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Room updated successfuly",
      data: room[1][0],
    });
  } catch (err) {
    sendErrorResponse("Room updated error", res, 500);
  }
};

const DeleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.destroy({ where: { id } });

    res.status(200).send({
      message: "Room deleted successfuly",
      data: room,
    });
  } catch (err) {
    sendErrorResponse("Room deleted error", res, 500);
  }
};

module.exports = {
  CreateRoom,
  GetAllRoom,
  GetOneRoom,
  UpdateRoom,
  DeleteRoom,
};
