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
    username VARCHAR(50) ,
    password VARCHAR(255) NOT NULL
);

-- Création de la table Administrator-Quiz
CREATE TABLE IF NOT EXISTS Administrator-Quiz (
    idAdministrator SERIAL PRIMARY KEY,
    idQuiz SERIAL PRIMARY KEY
);

-- Insertion d'un administrateur exemple


-- Vérification des données insérées
SELECT * FROM Administrator;
