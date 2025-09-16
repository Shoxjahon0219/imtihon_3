const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const signup = async (req, res) => {
  try {
    const { full_name, email, password, phone_number } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      return sendErrorResponse(
        { message: "This email is already registered" },
        res,
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newAdmin = await Admin.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
    });
    res.status(201).send({
      message: "Admin registered successfully",
      data: newAdmin,
    });
  } catch (error) {
    return sendErrorResponse(error, res, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }
    console.log(password, admin.password);

    const verifyPass = await bcrypt.compare(password, admin.password);

    if (!verifyPass) {
      return sendErrorResponse(
        {
          message: "Email yoki passworda noto'g'ri",
        },
        res,
        401
      );
    }

    let payload;
    if (admin.is_creater) {
      payload = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
        role: "Superadmin",
      };
    } else {
      payload = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
        role: "Admin",
      };
    }
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;

    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Admin logged in",
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

    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    admin.refresh_token = null;
    await admin.save();

    res.clearCookie("refreshToken");

    res.send({
      message: "Admin logged out",
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

    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    const compare = await bcrypt.compare(refreshToken, admin.refresh_token);

    if (!compare) {
      return sendErrorResponse({ message: "Refresh token notogri" }, res, 400);
    }

    let payload;
    if (admin.is_creater) {
      payload = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
        role: "Superadmin",
      };
    } else {
      payload = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
        role: "Admin",
      };
    }
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;

    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Admin token refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = { login, logout, refreshToken, signup };
