const express = require("express");
const { register, login, getUserInfoById } = require("../controller/users");
const usersRouter = express.Router();
const authentication = require("../middleware/authentication");
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", authentication, getUserInfoById);

module.exports = usersRouter;
