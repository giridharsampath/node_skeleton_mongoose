const connectDB = require("./util/database");
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}

app.use("/api/users", userRoutes);
app.use("/", homeRoutes);

const port = process.env.PORT || 3000;

connectDB()
  .then((result) => {
    app.listen(port, () => {
      debug(`Listening on Port ${port}`);
    });
  })
  .catch((err) => {
    debug(err);
  });
