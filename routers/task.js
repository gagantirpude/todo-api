import express from "express";
import {
  getMyTask,
  taskCreate,
  taskDelete,
  taskUpdate,
} from "../controllers/task.js";
import isAuthenticated from "../middlewares/auth.js";

//* Create Custom Router
const router = express.Router();

//* Routes for Task

//* Create Task
router.post("/create", isAuthenticated, taskCreate);

//* Get User Task
router.get("/get", isAuthenticated, getMyTask);

//*  Router with Route & Their Chining
router
  .route("/:id")
  .put(isAuthenticated, taskUpdate)
  .delete(isAuthenticated, taskDelete);

// Export
export default router;
