import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("Here");
if (!MONGODB_URI) throw new Error("Define MongoDB URI");

export default async function dbConnection() {

  const opts = {
    bufferCommands: false,
  };

  mongoose
    .connect(MONGODB_URI as string, opts)
    .then((mongoose) => mongoose);
}
