const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString
});
pool
  .connect()
  .then((res) => {
    console.log(`DB connected to ${res.database}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
const createTable = () => {
  pool
    .query(
      `CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        role VARCHAR(255) NOT NULL
    );
    CREATE TABLE permissions (
        id SERIAL PRIMARY KEY,
        permission VARCHAR(255) NOT NULL
    );
    CREATE TABLE role_permission (
        id SERIAL PRIMARY KEY,
        role_id INT REFERENCES roles(id),
        permission_id INT REFERENCES permissions(id)
    );
    CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        cover VARCHAR,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT,
        country VARCHAR(255),
        password VARCHAR(255),
        courses INT,
        role_id INT REFERENCES roles(id),
        is_deleted SMALLINT DEFAULT 0
    );
    CREATE TABLE courses (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        video VARCHAR,
        title VARCHAR,
        teachers_id INT REFERENCES teachers(id),
        description VARCHAR NOT NULL,
        is_deleted SMALLINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE teachers (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        cover VARCHAR,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT,
        country VARCHAR(255),
        password VARCHAR(255),
        courses INT,
        role_id INT REFERENCES roles(id),
        is_deleted SMALLINT DEFAULT 0
    );
    CREATE TABLE student_favorites (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id),
        course_id INT REFERENCES courses(id)
    );`
    )
    .then((result) => {})
    .catch(() => {});
};
module.exports = { pool };
