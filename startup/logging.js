const winston = require("winston");
require("winston-mongodb");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
require("express-async-errors");
const config = require("config");
const db = config.db;

module.exports = (app) => {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
    })
  );
  winston.exceptions.handle(
    new winston.transports.Console({
      level: "trace",
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false,
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  // winston.add(new winston.transports.MongoDB({ db }));

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan Enabled");
  }
};
