const { pool } = require("../models/db");
const createCourses = (req, res) => {
  const { photo, video, title, description } = req.body;
  const query =
    "INSERT INTO courses (photo, video, title, description) VALUE ($1,$2,$3,$4)  RETURNING *";
  const value = [photo, video, title, description];
  pool.query(query, value).then((result) => {
    res
      .status(201)
      .json({
        message: "created new course successfully",
        result: result.row[0]
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message
        });
      });
  });
};
const getAllCourses = (req, res) => {
  const query = "SELECT * FROM courses";
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        message: "all courses",
        result: result.row
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      });
    });
};

module.exports = { createCourses };
