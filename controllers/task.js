import Task from "../models/task.js";
import response from "../utils/response.js";
import ErrorHandler from "../middlewares/error.js";

//Create Task
export const taskCreate = async (req, res, next) => {
  try {
    //* Data form Body
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user,
    });

    //* Response
    response(res, 201, true, "Task Create Successfully", task);

    //* Data from User
  } catch (error) {
    next(error);
  }
};

//* Get Task Who Create By User
export const getMyTask = async (req, res, next) => {
  try {
    //* Find User Task
    const userID = req.user._id;
    //* Here we find user task by passing userID to Task model
    const task = await Task.find({ user: userID });

    //* Response
    response(res, 200, true, "My Task", task);
  } catch (error) {
    next(error);
  }
};

//* Update Task
export const taskUpdate = async (req, res, next) => {
  try {
    //* Find User Task
    const { id } = req.params;

    //* Here we find user task by passing userID to Task model
    const task = await Task.findById(id);

    //* Condition
    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    //* Condition if task true then task will be false or if task false then task will be true
    task.isCompleted = !task.isCompleted;

    //* Save Task to Database
    task.save();

    //* Response to Frontend User
    response(res, 200, true, "Your Task Has Been Updated", task);
  } catch (error) {
    next(error);
  }
};

//* Delete Task
export const taskDelete = async (req, res, next) => {
  try {
    //* Data from Params
    const UserId = req.params.id;

    //* Find Task from Database
    const task = await Task.findById(UserId);

    //* Condition
    if (task) {
      //* Delete Task
      task.deleteOne();
      //* If Task Exist
      response(res, 200, true, "Your Task Has Been Deleted", task);
    } else {
      //* If Task not Exist
      return next(new ErrorHandler("Task Dose has Not Exist", 404));
    }
  } catch (error) {
    next(error);
  }
};
