import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const signToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

const createSendToken = (user, statusCode, res) => {
  try {
    const accessToken = signToken(
      user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const refreshToken = signToken(
      user._id,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    // REMOVE PASSWORD FROM OUTPUT
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      accessToken,
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // IF INPUTS ARE EMPTY
  if (!email || !password || !username) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide name, email and password",
    });
  }

  try {
    // IF USER ALREADY EXISTS
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        status: "failed",
        message: "Email is already taken",
      });
    }

    const existingUserByName = await User.findOne({ username });
    if (existingUserByName) {
      return res.status(400).json({
        status: "failed",
        message: "User name is already taken",
      });
    }

    // CREATE NEW USER
    const newUser = await User.create({ username, email, password });

    // IF EVERYTHING IS OK -> SEND TOKEN
    createSendToken(newUser, 200, res);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  // IF INPUTS ARE EMPTY
  if ((!email && !username) || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide valid credentials",
    });
  }

  try {
    // FIND USER BY EMAIL OR PASSWORD
    const user = await User.findOne({ $or: [{ email }, { username }] }).select(
      "+password"
    );
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "faield",
        message: "Incorrect email/name or password",
      });
    }

    // IF EVERYTHING IS OK -> SEND TOKEN
    createSendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  // SEND AN EXPIRED COOKIE
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  //   SEND RESPONSE
  res.status(200).json({
    status: "success",
    message: "successfylly loggedout",
  });
};

// TOKEN REFRESH MECHANISM
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({
      status: "failed",
      message: "Access denied, token missing",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
