CREATE DATABASE Library_Management

CREATE TABLE Books (
	id serial PRIMARY KEY,
	title VARCHAR ( 50 ) UNIQUE NOT NULL,
	author VARCHAR ( 50 ) NOT NULL,
	published_year INT NOT NULL,
	stock INT NOT NULL,
	created_on TIMESTAMP NOT NULL
);
CREATE TABLE Users (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
    first_name VARCHAR ( 50 ) NOT NULL,
    last_name VARCHAR ( 50 ) NOT NULL,
    role INT NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    created_on DATE NOT NULL
);
CREATE TABLE Rented_Book (
	id serial PRIMARY KEY,
	book_id INT NOT NULL,
	user_id INT NOT NULL,
	rented DATE NOT NULL,
    return_date DATE NOT NULL,
     FOREIGN KEY (book_id) REFERENCES Books (id),
     FOREIGN KEY (user_id) REFERENCES Users (id)
);