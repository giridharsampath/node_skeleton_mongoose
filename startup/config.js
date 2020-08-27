const config = require("config");
const helmet = require("helmet");
const cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
};
