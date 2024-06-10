const { pool } = require("../models/db");
const createCourses = (req, res) => {
  const { photo, video, title, description } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO courses (photo, video, title, description,user_id)
    VALUES ($1, $2, $3, $4,$5)
    RETURNING *;`;
  const value = [photo, video, title, description, user_id];

  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        message: "Created new course successfully",
        result: result.rows[0]
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
const getAllCoursesByUserId = (req, res) => {
  // const userId = req.token.userId;
  const user_id = req.token.userId;
  const query = `SELECT * FROM courses WHERE user_id = $1 AND is_deleted = 0;
  `;
  const value = [user_id];
  pool
    .query(query, value)
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
  ,users.image
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
  const { id } = req.params;
  const query = ` UPDATE courses 
  SET 
      photo = COALESCE($1, photo),
      video = COALESCE($2, video),
      title = COALESCE($3, title),
      description = COALESCE($4, description)
  WHERE 
      id = $5 
      AND is_deleted = 0 
  RETURNING *;`;
  const value = [
    photo || null,
    video || null,
    title || null,
    description || null,
    id
  ];
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
const softDeletedcourses = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE courses SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `courses with id: ${id} deleted successfully`
        });
      } else {
        throw new Error("Error happened while deleting post");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err
      });
    });
};
const getCoursesById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT *
  FROM courses, users
  WHERE courses.id = $1
    AND courses.user_id = users.id;`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Courses data  successfully",
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
module.exports = {
  updateCourses,
  getAllCoursesForUser,
  getAllCourses,
  createCourses,
  softDeletedcourses,
  getAllCoursesByUserId,
  getCoursesById
};
