import express from "express";
import { config } from "dotenv";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//* Server
const app = express();

//! DotEnv Path
config({
  path: "./data/config.env",
});

//*s Middleware
app.use(express.json());
app.use(cookieParser());

//* Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//* Error Handler
app.use(errorMiddleware);

//* For Communication with Frontend
//* Enable CORS with custom options
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type,Authorization"],
  })
);

//* Root Directory
app.get("/", (req, res) => {
  res.send(`Hello Todo API`);
});

//* Export
export default app;
