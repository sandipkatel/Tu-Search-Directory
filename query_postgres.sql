CREATE DATABASE tu_search_directory;

\c tu_search_directory;

CREATE TABLE central_office (
    org_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE institute_faculties (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL REFERENCES central_office(org_id),
    name VARCHAR(100)
);
ALTER SEQUENCE institute_faculties_id_seq RESTART WITH 101;

CREATE TABLE central_department (
    id SERIAL PRIMARY KEY,
    org_id INT REFERENCES central_office(org_id),
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(255),
    location VARCHAR(255),
    isActive BOOLEAN,
    website VARCHAR(255)
);
ALTER SEQUENCE central_department_id_seq RESTART WITH 201;

CREATE TABLE campus (
    id SERIAL PRIMARY KEY,
    ho_id INT NOT NULL REFERENCES institute_faculties(id),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    website VARCHAR(255)
);
ALTER SEQUENCE campus_id_seq RESTART WITH 1001;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    c_id INT NOT NULL REFERENCES campus(id),
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255)
);
ALTER SEQUENCE department_id_seq RESTART WITH 101;

CREATE TABLE personnel (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    position VARCHAR(255),
    imageUrl VARCHAR(255),
    org_id INT REFERENCES central_office(org_id),
    faculty_id INT REFERENCES institute_faculties(id),
    campus_id INT REFERENCES campus(id),
    dept_id INT REFERENCES department(id),
    c_dept_id INT REFERENCES central_department(id)
);
ALTER SEQUENCE personnel_id_seq RESTART WITH 1000001;

CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    about TEXT,
    director_id INT REFERENCES personnel(id)
);
ALTER SEQUENCE program_id_seq RESTART WITH 301;