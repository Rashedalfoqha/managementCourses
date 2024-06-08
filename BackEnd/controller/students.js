const { pool } = require("../models/db");
const register = async (req, res) => {
  const { photo, cover, firstName, lastName, email, age, country, password } =
    req.body;
  const bcryptPassword = await bcrypt.hash(password, process.env.PASS);
  const role_id = "1";
  const query = `INSERT INTO students (photo,
    cover,
    firstName,
    lastName,
    email,
    age,
    country,
    password ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const values = [
    photo,
    cover,
    firstName,
    lastName,
    email.toLowerCase(),
    age,
    country,
    bcryptPassword
  ];
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "created email successfully",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exited",
        err: err.message
      });
    });
};
module.exports = {
  register
};
