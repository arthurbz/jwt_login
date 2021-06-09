CREATE DATABASE DATABASE_JWT;

/*Needs extension for uuid generate*/
CREATE TABLE Users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);