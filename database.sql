CREATE DATABASE reptiles;

CREATE TABLE reptileWithImage(
    reptile_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(300),
    type VARCHAR(300),
    image bytea
);