const express = require("express");
const coursesRouter = express.Router();
const {
  createCourses,
  getAllCoursesForUser,
  getAllCourses,
  updateCourses,
  softDeletedcourses,
  getAllCoursesByUserId,
  getCoursesById
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
coursesRouter.put(
  "/update/:id",
  authentication,
  authorization("UPDATE_COURSES"),
  updateCourses
);
coursesRouter.delete(
  "/delete/:id",
  authentication,

  softDeletedcourses
);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/users/cour", authentication, getAllCoursesByUserId);
module.exports = coursesRouter;
 