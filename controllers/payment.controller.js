const { sendErrorResponse } = require("../helpers/send.error.response.js");
const Payment = require("../models/payment");

const CreatePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const newPayment = await Payment.create({
      amount,
    });

    res.status(201).send({
      message: "New Payment сreated successfuly",
      data: newPayment,
    });
  } catch (err) {
    return sendErrorResponse(err, res, 500);
  }
};

const GetAllPayment = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    res.status(200).send({
      message: "Payments find successfuly",
      data: payments,
    });
  } catch (err) {
    sendErrorResponse("Payments find error", res, 500);
  }
};

const GetOnePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByPk(id);

    res.status(200).send({
      message: "Payment fetched successfuly",
      data: payment,
    });
  } catch (err) {
    sendErrorResponse("Payment fetch error", res, 500);
  }
};

const UpdatePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    const payment = await Payment.update(
      {
        amount,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).send({
      message: "Payment updated successfuly",
      data: payment[1][0],
    });
  } catch (err) {
    sendErrorResponse("Payment updated error", res, 500);
  }
};

const DeletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.destroy({ where: { id } });

    res.status(200).send({
      message: "Payment deleted successfuly",
      data: payment,
    });
  } catch (err) {
    sendErrorResponse("Payment deleted error", res, 500);
  }
};

module.exports = {
  CreatePayment,
  GetAllPayment,
  GetOnePayment,
  UpdatePayment,
  DeletePayment,
};
