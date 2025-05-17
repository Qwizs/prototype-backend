--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Homebrew)
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

-- Création de la base de données
-- CREATE DATABASE database;

-- Connexion à la base de données
\c database;

-- Création de la table Administrator
CREATE TABLE IF NOT EXISTS Administrator (
    idAdministrator SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255) NOT NULL
);

-- Vérification des données insérées
SELECT * FROM Administrator;


-- Création de la table Category
CREATE TABLE IF NOT EXISTS Category (
    idCategory SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- Vérification des données insérées
SELECT * FROM Category;


-- Création de la table Quiz
CREATE TABLE IF NOT EXISTS Quiz (
    idQuiz SERIAL PRIMARY KEY,
    idCategory INTEGER,
    name VARCHAR(50),
    FOREIGN KEY (idCategory) REFERENCES Category(idCategory)
);

-- Vérification des données insérées
SELECT * FROM Quiz;

-- Création de la table Media
CREATE TABLE IF NOT EXISTS Media (
    idMedia SERIAL PRIMARY KEY,
    type VARCHAR(50),
    content VARCHAR(100)
);

-- Vérification des données insérées
SELECT * FROM Media;

-- Création de la table AdministratorQuiz
CREATE TABLE IF NOT EXISTS administrator_quiz (
    idAdministrator INTEGER,
    idQuiz INTEGER
);

-- Vérification des données insérées
SELECT * FROM administrator_quiz;

-- Création de la table Questions
CREATE TABLE IF NOT EXISTS Question (
    idQuestion SERIAL PRIMARY KEY,
    description VARCHAR(1000),
    type VARCHAR(50),
    duration INTEGER,
    score INTEGER
);

-- Vérification des données insérées
SELECT * FROM Question;

-- Création de la table Answers
CREATE TABLE IF NOT EXISTS answer (
    idAnswer SERIAL PRIMARY KEY,
    value VARCHAR(50)
);

-- Vérification des données insérées
SELECT * FROM Answer;

-- Création de la table AnswerQuestion
CREATE TABLE IF NOT EXISTS answer_question (
    idQuestion SERIAL PRIMARY KEY,
    idAnswer INTEGER NOT NULL,
    state BOOLEAN,
    "order" INTEGER
);

-- Vérification des données insérées
SELECT * FROM answer_question;

-- Création de la table QuizQuestion
CREATE TABLE IF NOT EXISTS quiz_question (
    idQuiz SERIAL PRIMARY KEY,
    idQuestion INTEGER NOT NULL,
    "order" INTEGER
);

-- Vérification des données insérées
SELECT * FROM quiz_question;
