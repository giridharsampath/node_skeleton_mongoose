const mongoose = require("mongoose");
const debug = require("debug")("app:db");
const config = require("config");
const db = config.db;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    debug("MONGODB connected...");
    return;
  } catch (err) {
    debug(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
