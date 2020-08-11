const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getUsers);

router.get("/:id", userController.findUser);

router.post("/", userController.createUser);

module.exports = router;
