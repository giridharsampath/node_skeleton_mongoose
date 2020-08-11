// Packages
const Joi = require("joi");

// Models
const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send({ message: "Something went wrong" });
  }
};

exports.findUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });

  if (!user) {
    return res.status(404).send("Not found");
  }
  res.send(user);
};

exports.createUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const user = new User({ name: req.body.name });
  await user.save();
  res.send(user);
};
