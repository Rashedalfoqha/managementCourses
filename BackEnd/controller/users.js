const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const {
    image,
    cover,
    firstName,
    lastName,
    email,
    age,
    country,
    password,
    user_type
  } = req.body;
  const Salt = process.env.PASS;
  console.log();
  const bcryptPassword = await bcrypt.hash(password, Number(Salt));
  let role_id;

  if (user_type === "student") {
    role_id = 2;
  } else if (user_type === "teacher") {
    role_id = 1;
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
      image,
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
    image || null,
    cover || null,
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
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
                role_id: result.rows[0].role_id
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err
      });
    });
};
const getUserInfoById = (req, res) => {
  const id = req.token.userId;
  const query = "SELECT * FROM users WHERE id=$1";
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        message: "users",
        result: result.rows
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateData = (req, res) => {
  const id = req.token.userId;
  const { image, cover, firstName, lastName, email, country } = req.body;

  const query = `
    UPDATE users 
    SET 
      image = COALESCE($1, image),
      cover = COALESCE($2, cover),
      firstName = COALESCE($3, firstName),
      lastName = COALESCE($4, lastName),
      email = COALESCE($5, email),
      country = COALESCE($6, country)
    WHERE 
      id = $7 
      AND is_deleted = 0 
    RETURNING *;
  `;

  const values = [image, cover, firstName, lastName, email, country, id];

  pool
    .query(query, values)
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
const getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id=$1";
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        message: "users",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const allUsers = (req, res) => {
  const query = `SELECT * FROM users WHERE role_id = 1`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        message: "teacher users",
        result: result.rows
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = {
  register,
  login,
  getUserInfoById,
  updateData,
  getUserById,
  allUsers
};
