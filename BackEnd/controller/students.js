const { pool } = require("../models/db");

const register = async (req, res) => {
  const {
    photo,
    cover,
    firstName,
    lastName,
    email,
    age,
    country,
    password,
    user_type
  } = req.body;
  const bcryptPassword = await bcrypt.hash(password, process.env.PASS);
  let role_id;

  if (user_type === "student") {
    role_id = 1;
  } else if (user_type === "teacher") {
    role_id = 2;
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user type"
    });
    return;
  }

  const query = `
    INSERT INTO users (
      role_id,
      photo,
      cover,
      firstName,
      lastName,
      email,
      age,
      country,
      password,
      user_type
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *`;

  const values = [
    role_id,
    photo,
    cover,
    firstName,
    lastName,
    email.toLowerCase(),
    age,
    country,
    bcryptPassword,
    user_type
  ];

  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "User created successfully",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        error: err.message
      });
    });
};

module.exports = {
  register,
};
