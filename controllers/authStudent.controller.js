const { sendErrorResponse } = require("../helpers/send.error.response");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const signup = async (req, res) => {
  try {
    const { full_name, email, password, phone_number } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (student) {
      return sendErrorResponse(
        { message: "This email is already registered" },
        res,
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newStudent = await Student.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
    });
    res.status(201).send({
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    return sendErrorResponse(error, res, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }
    const verifyPass = await bcrypt.compare(password, student.password);

    if (!verifyPass) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }
    const payload = {
      id: student.id,
      email: student.email,
      is_active: student.is_active,
      role: "Student",
    };
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    student.refresh_token = hashedRefreshToken;

    await student.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Student logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    return sendErrorResponse(error, res, 500);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token topilmadi" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const student = await Student.findByPk(verifiedRefreshToken.id);
    student.refresh_token = null;
    await student.save();

    res.clearCookie("refreshToken");

    res.send({
      message: "Student logged out",
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token topilmadi" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const student = await Student.findByPk(verifiedRefreshToken.id);
    console.log(refreshToken, student.refresh_token);

    const compare = await bcrypt.compare(refreshToken, student.refresh_token);

    if (!compare) {
      return sendErrorResponse({ message: "Refresh token notogri" }, res, 400);
    }

    const payload = {
      id: student.id,
      email: student.email,
      is_active: student.is_active,
      role: "Student",
    };

    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    student.refresh_token = hashedRefreshToken;

    await student.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Student token refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = { login, logout, refreshToken, signup };
