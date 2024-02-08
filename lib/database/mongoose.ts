import mongoose from "mongoose";

let isConnected = false; // Track connection status
const MONGODB_URI = process.env.MONGODB_URI!
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "organick",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};