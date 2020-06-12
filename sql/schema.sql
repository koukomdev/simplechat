CREATE DATABASE IF NOT EXISTS `simplechat` DEFAULT CHARACTER SET utf8mb4;
USE simplechat;

CREATE TABLE IF NOT EXISTS `users` (
    id         INTEGER      PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(191) NOT NULL UNIQUE,
    password   VARCHAR(191) NOT NULL,
    created_at DATETIME     NOT NULL
);

CREATE TABLE IF NOT EXISTS `comments` (
    id         INTEGER      PRIMARY KEY AUTO_INCREMENT,
    user_id    INTEGER      NOT NULL,
    text       TEXT,
    image_path VARCHAR(191),
    created_at DATETIME     NOT NULL,
    CONSTRAINT fk_user_id
      FOREIGN KEY (user_id)
      REFERENCES users (id)
);
