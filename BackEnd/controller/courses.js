const { pool } = require("../models/db");
const createCourses = (req, res) => {
  const { photo, video, title, description } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO courses (photo, video, title, description,user_id)
    VALUES ($1, $2, $3, $4,$5)
    RETURNING *;`;
  const value = [photo, video, title, description, user_id];
  pool.query(query, value).then((result) => {
    res
      .status(201)
      .json({
        message: "created new course successfully",
        result: result.rows[0]
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
const getAllCoursesForUser = (req, res) => {
  const query = `SELECT 
  courses.*,
  users.firstName, 
  users.lastName,
  users.email,
  users.age,
  users.country
FROM 
  courses
INNER JOIN 
  users ON courses.user_id = users.id
WHERE 
  courses.is_deleted = 0
ORDER BY 
  courses.created_at;`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        message: "all courses",
        result: result.rows
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
const getAllCourses = (req, res) => {
  const query = `SELECT courses.*,
  users.firstName, 
  users.lastName,
  users.email,
  users.age,
  users.country
  FROM courses, users
  WHERE courses.is_deleted = 0
  ORDER BY courses.created_at;`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        message: "all courses",
        result: result.rows
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
const updateCourses = (req, res) => {
  const { photo, video, title, description } = req.body;
  const query = ` UPDATE courses 
  SET 
    photo = COALESCE($1, photo),
    video = COALESCE($2, video),
    title = COALESCE($3, title),
    description = COALESCE($4, description),
  WHERE 
    id = $5 
    AND is_deleted = 0 
  RETURNING *`;
  const value = [photo, video, title, description];
  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Updated data successfully",
        result: result.rows
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message
      });
    });
};
module.exports = {
  updateCourses,
  getAllCoursesForUser,
  getAllCourses,
  createCourses
};
