const express = require("express");
const coursesRouter = express.Router();
const { createCourses } = require("../controller/coruses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
coursesRouter.post("/create",authentication,authorization("CREATE_COURSES"),createCourses)
module.exports = coursesRouter;
