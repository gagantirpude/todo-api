import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todo_api",
    })
    .then((c) => {
      console.log(`Database Host :${c.connection.host}`);
    })
    .catch((error) => console.log(error));
};

export default connectDB;
