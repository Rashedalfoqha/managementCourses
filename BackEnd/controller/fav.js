import { pool } from "../models/db";

const addFavorites = (req, res) => {
  const user_id = req.token.userId;
  const { course_id } = req.body;
  const query = `INSERT INTO users_favorites (user_id, course_id) VALUES ($1, $2) RETURNING *`;
  const values = [user_id, course_id];
  pool.query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Course added to favorites",
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

const deleteFavorites = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users_favorites WHERE id = $1`;
  const values = [id];
  pool.query(query, values)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Favorite course deleted successfully"
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

module.exports = { addFavorites, deleteFavorites };
