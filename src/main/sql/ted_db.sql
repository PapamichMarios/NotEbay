-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ted_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ted_db` ;

-- -----------------------------------------------------
-- Schema ted_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ted_db` DEFAULT CHARACTER SET utf8 ;
USE `ted_db` ;

-- -----------------------------------------------------
-- Table `ted_db`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`users` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(80) NULL,
  `last_name` VARCHAR(80) NULL,
  `phone` VARCHAR(45) NULL,
  `tin` VARCHAR(80) NULL,
  `street_address` VARCHAR(150) NULL,
  `email` VARCHAR(80) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  `city` VARCHAR(180) NULL,
  `country` VARCHAR(180) NULL,
  `postal_code` VARCHAR(45) NULL,
  `geo_lat` DECIMAL(10,6) NULL,
  `geo_long` DECIMAL(10,6) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`user_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`user_roles` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`user_roles` (
  `role_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  INDEX `fk_roles_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_roles_has_user_roles_idx` (`role_id` ASC),
  CONSTRAINT `fk_roles_has_user_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `ted_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roles_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`bids`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`bids` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`bids` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `bidder_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `bid_amount` DECIMAL(19,4) NOT NULL,
  `bid_time` DATETIME NOT NULL,
  `accepted` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_items_items1_idx` (`item_id` ASC),
  INDEX `fk_users_has_items_users1_idx` (`bidder_id` ASC),
  CONSTRAINT `fk_users_has_items_users1`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_items_items1`
    FOREIGN KEY (`item_id`)
    REFERENCES `ted_db`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`items` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `seller_id` BIGINT NOT NULL,
  `buy_price` DECIMAL(19,4) NULL,
  `first_bid` DECIMAL(19,4) NULL,
  `num_of_bids` INT NULL,
  `description` VARCHAR(10000) NULL,
  `time_started` DATETIME NOT NULL,
  `time_ends` DATETIME NOT NULL,
  `country` VARCHAR(60) NULL,
  `image_path` VARCHAR(300) NULL,
  `name` VARCHAR(80) NOT NULL,
  `location` VARCHAR(180) NULL,
  `geo_lat` DECIMAL(10,6) NULL,
  `geo_long` DECIMAL(10,6) NULL,
  `active` TINYINT(1) NOT NULL,
  `best_bid_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_users1_idx` (`seller_id` ASC),
  INDEX `fk_items_bids1_idx` (`best_bid_id` ASC),
  CONSTRAINT `fk_items_users1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_bids1`
    FOREIGN KEY (`best_bid_id`)
    REFERENCES `ted_db`.`bids` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`categories` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `parent_id` BIGINT NULL,
  `item_id` BIGINT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categories_items1_idx` (`item_id` ASC),
  INDEX `fk_categories_categories1_idx` (`parent_id` ASC),
  CONSTRAINT `fk_categories_items1`
    FOREIGN KEY (`item_id`)
    REFERENCES `ted_db`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categories_categories1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `ted_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`seller_ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`seller_ratings` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`seller_ratings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `seller_id` BIGINT NOT NULL,
  `bidder_id` BIGINT NOT NULL,
  `rating` TINYINT NOT NULL,
  `comment` VARCHAR(200) NULL,
  `rate_date` TIMESTAMP NULL,
  INDEX `fk_users_has_users_users2_idx` (`bidder_id` ASC),
  INDEX `fk_users_has_users_users1_idx` (`seller_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`bidder_ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`bidder_ratings` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`bidder_ratings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `seller_id` BIGINT NOT NULL,
  `bidder_id` BIGINT NOT NULL,
  `rating` TINYINT NOT NULL,
  `comment` VARCHAR(200) NULL,
  `rate_date` TIMESTAMP NULL,
  INDEX `fk_users_has_users_users4_idx` (`bidder_id` ASC),
  INDEX `fk_users_has_users_users3_idx` (`seller_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_has_users_users3`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users4`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ted_db`.`messages` ;

CREATE TABLE IF NOT EXISTS `ted_db`.`messages` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT NOT NULL,
  `receiver_id` BIGINT NOT NULL,
  `header` VARCHAR(500) NULL,
  `message` VARCHAR(8000) NULL,
  `seen` TINYINT(1) NOT NULL,
  `time_sent` TIMESTAMP NOT NULL,
  `delete_state` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mesages_users1_idx` (`sender_id` ASC),
  INDEX `fk_mesages_users2_idx` (`receiver_id` ASC),
  CONSTRAINT `fk_mesages_users1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mesages_users2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `ted_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
