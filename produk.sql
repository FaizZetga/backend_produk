CREATE DATABASE toko_db;

USE toko_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    category TEXT NOT NULL
);