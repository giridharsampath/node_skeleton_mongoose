const mongoose = require("mongoose");
const debug = require("debug")("app:db");
const startup = require("debug")("app:startup");
const config = require("config");
const db = config.db;

module.exports = async (app) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await mongoose.set("useUnifiedTopology", true);
    debug("MONGODB connected...");
    const port = process.env.HS_BATCHING_SERVICE_PORT || 3002;
    app.listen(port, () => {
      startup(`Listening on Port ${port}`);
    });
    return;
  } catch (err) {
    debug(err.message);
    process.exit(1);
  }
};
