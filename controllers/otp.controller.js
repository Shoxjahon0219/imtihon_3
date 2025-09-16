const sendEmail = require("../helpers/sendEmail");
const { totp } = require("otplib");
const config = require("config");
const { sendErrorResponse } = require("../helpers/send.error.response");
const Student = require("../models/student");
const Admin = require("../models/admin");

totp.options = { step: 60 };

const sendOtpStudent = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    if (student.is_active) {
      return res.status(200).send({ message: "Student is already active" });
    }

    const otp = totp.generate(email + config.get("otp_password"));

    await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

    res.status(200).send({
      message: "OTP sent successfully",

      data: { otp }, // In production, do not send OTP back in response
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const sendOtpAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    if (admin.is_active) {
      return res.status(200).send({ message: "Admin is already active" });
    }

    const otp = totp.generate(email + config.get("otp_password"));

    await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

    res.status(200).send({
      message: "OTP sent successfully",

      data: { otp }, // In production, do not send OTP back in response
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const verifyOtpStudent = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const verify = totp.check(otp, email + config.get("otp_password"));

    if (verify) {
      student.is_active = true;
      await student.save();

      res.status(200).send({
        message: "OTP verified successfully and Student activated",
        data: { verified: true },
      });
    } else {
      res.status(400).send({
        message: "Invalid or expired OTP",
        data: { verified: false },
      });
    }
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const verifyOtpAdmin = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const verify = totp.check(otp, email + config.get("otp_password"));

    if (verify) {
      admin.is_active = true;
      await admin.save();

      res.status(200).send({
        message: "OTP verified successfully and Admin activated",
        data: { verified: true },
      });
    } else {
      res.status(400).send({
        message: "Invalid or expired OTP",
        data: { verified: false },
      });
    }
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  sendOtpStudent,
  sendOtpAdmin,
  verifyOtpStudent,
  verifyOtpAdmin,
};
