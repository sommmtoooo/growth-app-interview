import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Here");
if (!MONGODB_URI) throw new Error("Define MongoDB URI");

// Preventing Connection From Growing
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { connection: null, promise: null };

export default async function dbConnection() {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((mongoose) => mongoose);
  }
}
