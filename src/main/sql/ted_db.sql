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
CREATE TABLE IF NOT EXISTS `ted_db`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ted_db`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(80) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(80) NOT NULL,
  `last_name` VARCHAR(80) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `vat_num` VARCHAR(80) NULL,
  `street_address` VARCHAR(150) NULL,
  `geo_location` POINT NULL,
  `email` VARCHAR(80) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ted_db`.`user_roles`
-- -----------------------------------------------------
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
