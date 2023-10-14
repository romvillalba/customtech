USE customtech_db;

CREATE TABLE `profile`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `user`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `erased` TINYINT(1) NOT NULL,
    `image` VARCHAR(255),
    `id_profile` INT UNSIGNED NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,
    PRIMARY KEY(id),
	FOREIGN KEY (id_profile) REFERENCES profile(id)
);

    
CREATE TABLE `category`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` BIGINT NOT NULL
);

CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` INT NULL,
    `erased` TINYINT(1) NOT NULL,
    `id_category` INT UNSIGNED NOT NULL,
    `create_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,
    `stock` INT UNSIGNED,
    PRIMARY KEY(id),
	FOREIGN KEY (id_category) REFERENCES category(id)
);


CREATE TABLE `bills`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `total` ENUM('') NOT NULL,
    `fecha` DATE NOT NULL,
    `id_user` INT UNSIGNED NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE `bills_products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_bills` INT UNSIGNED NOT NULL,
    `id_products` INT UNSIGNED NOT NULL,
    `cantidad` INT NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY(id),
	FOREIGN KEY (id_bills) REFERENCES bills(id),
    FOREIGN KEY (id_products) REFERENCES products(id)
);

    
CREATE TABLE `product_image`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `id_products` INT UNSIGNED NOT NULL,
    `erased` TINYINT(1) NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (id_products) REFERENCES products(id)
);