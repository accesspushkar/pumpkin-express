Router = require('express').Router()

const user = require("../controllers/user.js");

// Login user
Router.use("/login", user.login);
// Get user
Router.use("/get/:id", user.getOne);
// Sign up
Router.use("/signup", user.signUp);

module.exports = Router;