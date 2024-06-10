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
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        role_id INT REFERENCES roles(id),
        course_id INT,
        image VARCHAR,
        user_type VARCHAR(255),
        cover VARCHAR,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT,
        country VARCHAR(255),
        password VARCHAR(255),
        is_deleted SMALLINT DEFAULT 0
    );
    
    CREATE TABLE courses (
        id SERIAL PRIMARY KEY,
        photo VARCHAR,
        video VARCHAR,
        title VARCHAR,
        user_id INT REFERENCES users(id),
        description VARCHAR NOT NULL,
        is_deleted SMALLINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    ALTER TABLE users
    ADD CONSTRAINT fk_users_courses FOREIGN KEY (course_id) REFERENCES courses(id);
    
    CREATE TABLE users_favorites (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        course_id INT REFERENCES courses(id)
    );
    