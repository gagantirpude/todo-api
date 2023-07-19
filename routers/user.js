import express from "express";
import {
  loginUser,
  userRegister,
  userLogout,
  userProfile,
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/auth.js";

//Create Router for express Router
const router = express.Router();

//Routes for User
//! Register User
router.post("/register", userRegister);

//! Login User
router.post("/login", loginUser);

//! Profile
router.get("/profile", isAuthenticated, userProfile);

//! Logout
router.get("/logout", isAuthenticated, userLogout);

//! Export
export default router;
