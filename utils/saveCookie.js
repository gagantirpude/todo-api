//* IMPORT
import jwt from "jsonwebtoken";

//* Arrow Function
const saveCookie = (res, user, statusCode, message) => {
  //* jsonwebtoken
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res //* Cookie
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    }) //* Status Code
    .status(statusCode)
    //* json Response
    .json({
      success: true,
      message,
    });
};

//! EXPORT
export default saveCookie;
