//* Import
import User from "../models/user.js";
import bcrypt from "bcrypt";
import saveCookie from "../utils/saveCookie.js";
import ErrorHandler from "../middlewares/error.js";
import response from "../utils/response.js";
import removeCookie from "../utils/removeCookie.js";

//! User Register
export const userRegister = async (req, res, next) => {
  try {
    //get Data form Body
    const { name, email, password } = req.body;

    //find Data form Database
    let user = await User.findOne({ email });

    //* if User Exist
    if (user) {
      return next(new ErrorHandler("User Already Exist", 404));
    } else {
      //* Crypt Password
      const hashPassword = await bcrypt.hash(password, 10);

      //* Create User
      user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      //* Save Cookie and sand Response
      saveCookie(res, user, 200, "User Register Successfully");
    }
  } catch (error) {
    next(error);
  }
};

//! Login for user
export const loginUser = async (req, res, next) => {
  try {
    // Get Data form Body
    const { email, password } = req.body;

    // Find User from Database
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Please Register First", 400));
    } else {
      // Compare Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next(new ErrorHandler("Invalid Email & Password", 404));
      } else {
        //* Save Cookies and Sand Response
        saveCookie(res, user, 200, `Welcome Back ${user.name}`);
      }
    }
  } catch (error) {
    next(error);
  }
};

//! User Profile
export const userProfile = async (req, res, next) => {
  try {
    //* Get User form Authentication
    const user = req.user;

    //* Response
    response(res, 200, true, `User Found Successfully`, user);
  } catch (error) {
    next(error);
  }
};

//! User Logout
export const userLogout = async (req, res) => {
  removeCookie(req, res, 200, true, `${req.user.name} Logout Successfully`);
};
