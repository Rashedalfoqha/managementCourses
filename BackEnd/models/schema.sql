CREATE TABLE roles (
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