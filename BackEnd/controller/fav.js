import { pool } from "../models/db";

const addFavorites = (req, res) => {
  const user_id = req.token.userId;
  const { course_id } = req.body;
  const query = `INSERT INTO users_favorites (user_id, course_id) VALUE ($1,$2) RETURNING *`;
  const value = [user_id, course_id];
  pool.query(query, value).then((result) => {
    res
      .status(201)
      .json({
        success: true,
        message: "add to favorites",
        result: result.rows
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err.message
        });
      });
  });
};

module.exports = { addFavorites };
