const express = require("express");
const { register, login } = require("../controller/users");
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
