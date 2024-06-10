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
  "/update",
  authentication,
  authorization("UPDATE_COURSES"),
  updateCourses
);
coursesRouter.delete(
  "/delete",
  authentication,
  authorization("DELETE_COURSES"),
  softDeletedcourses
);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/users/cour", authentication, getAllCoursesByUserId);
module.exports = coursesRouter;
