import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING
    );
    console.log(
      "Connection  to the database has been established successfully.",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("mongodb server connection error");
    throw error;
  }
};
