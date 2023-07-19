//* Import
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import response from "../utils/response.js";

const isAuthenticated = async (req, res, next) => {
  //* Request Cookies who Create by user Login or Register
  const { token } = req.cookies;

  //* Condition
  if (token) {
    //* If Cookies Exist

    //* Verify token and ENV Variable Value and using verify method to decode jsonwebtoken

    //* Add to decoded variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //* inside decoded variable we find userID and Jsonwebtoken value by login user.
    // console.log("decoded", decoded);

    //* with user id we can find all details about user accept user password
    //* and now we chain (or store) user data in req object by using  concatenation
    req.user = await User.findById(decoded._id);

    // console.log("req.user", req.user);
    next();
  } else {
    //* if user not login or Not Found the this process work
    //* Response
    response(res, 404, false, "User Not Authorized Please Login First", null);
  }
};

//! Export
export default isAuthenticated;
