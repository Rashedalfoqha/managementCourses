const express = require("express");
const coursesRouter = express.Router();
const {
  createCourses,
  getAllCoursesForUser,
  getAllCourses
} = require("../controller/courses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
coursesRouter.post(
  "/create",
  authentication,
  authorization("CREATE_COURSES"),
  createCourses
);
coursesRouter.get("/", getAllCoursesForUser);
coursesRouter.get("/all", getAllCourses);
module.exports = coursesRouter;
