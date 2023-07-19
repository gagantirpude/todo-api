import app from "./app.js";
import connectDB from "./data/database.js";

//TODO: Database connection function
connectDB();

//Todo: Listen
app.listen(process.env.PORT, () => {
  console.log(
    `Server is Working on Port No: ${process.env.PORT} on ${process.env.NODE_ENV} mode`
  );
});
