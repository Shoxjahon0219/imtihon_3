const { sendErrorResponse } = require("../helpers/send.error.response");
const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const signup = async (req, res) => {
  try {
    const { full_name, email, password, phone_number } = req.body;
    const teacher = await Teacher.findOne({ where: { email } });
    if (teacher) {
      return sendErrorResponse(
        { message: "This email is already registered" },
        res,
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newTeacher = await Teacher.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
    });
    res.status(201).send({
      message: "Teacher registered successfully",
      data: newTeacher,
    });
  } catch (error) {
    return sendErrorResponse(error, res, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ where: { email } });
    if (!teacher) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }

    const verifyPass = await bcrypt.compare(password, teacher.password);

    if (!verifyPass) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }
    if (teacher.is_head_mentor) {
      const payload = {
        id: teacher.id,
        email: teacher.email,
        is_active: teacher.is_active,
        is_head_mentor: teacher.is_head_mentor,
        role: "Superteacher",
      };
    } else {
      const payload = {
        id: teacher.id,
        email: teacher.email,
        is_active: teacher.is_active,
        is_head_mentor: teacher.is_head_mentor,
        role: "Teacher",
      };
    }
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    teacher.refresh_token = hashedRefreshToken;

    await teacher.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Teacher logged in",
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

    const teacher = await Teacher.findByPk(verifiedRefreshToken.id);
    teacher.refresh_token = null;
    await teacher.save();

    res.clearCookie("refreshToken");

    res.send({
      message: "Teacher logged out",
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

    const teacher = await Teacher.findByPk(verifiedRefreshToken.id);

    const compare = await bcrypt.compare(refreshToken, teacher.refresh_token);

    if (!compare) {
      return sendErrorResponse({ message: "Refresh token notogri" }, res, 400);
    }

    let payload;
    if (teacher.is_head_mentor) {
      payload = {
        id: teacher.id,
        email: teacher.email,
        is_active: teacher.is_active,
        is_head_mentor: teacher.is_head_mentor,
        role: "Teacher",  // Head mentor hali Superteacher boladi
      };
    } else {
      payload = {
        id: teacher.id,
        email: teacher.email,
        is_active: teacher.is_active,
        is_head_mentor: teacher.is_head_mentor,
        role: "Teacher",
      };
    }
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    teacher.refresh_token = hashedRefreshToken;

    await teacher.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Teacher token refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = { login, logout, refreshToken, signup };
