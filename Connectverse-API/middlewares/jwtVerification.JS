import User from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;

  // GET THE TOKEN FROM THE COOKIE OR THE HEADERS
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // IF TOKEN DOES NOT EXIST
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "You are not logged in. Please log in to get access",
    });
  }

  // VERIFY THE TOKEN, FIND THE USER AND ATTACH IT TO THE REQUEST OBJECT
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "The user belonging to this token does no longer exist",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};

export default protect;
