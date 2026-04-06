const mongoose = require("mongoose");

// Connect to the MongoDB database

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "LMS" });
  mongoose.connection.on("connected", () => console.log("Database Connected"));
};

module.exports = connectDB;
