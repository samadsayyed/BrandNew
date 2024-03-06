import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const connectDb = () => {
  mongoose
    .connect(process.env.DATA_BASEURI,{
      dbName:"TaskFlow"
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 3*24*60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      user
    });
};