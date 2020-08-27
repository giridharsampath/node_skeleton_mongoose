const express = require("express");
const app = express();

require("./startup/db")(app);
require("./startup/logging")(app);
require("./startup/config")(app);
require("./startup/routes")(app);
