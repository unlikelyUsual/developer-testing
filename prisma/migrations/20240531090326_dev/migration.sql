-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `bedrooms` INTEGER NOT NULL,
    `area` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('SALE', 'RENT') NOT NULL,
    `thumbnail` MEDIUMTEXT NOT NULL,
    `images` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `properties_type_idx`(`type`),
    INDEX `properties_price_idx`(`price`),
    INDEX `properties_bedrooms_idx`(`bedrooms`),
    INDEX `properties_area_idx`(`area`),
    INDEX `properties_type_price_idx`(`type`, `price`),
    INDEX `properties_type_bedrooms_idx`(`type`, `bedrooms`),
    INDEX `properties_type_area_idx`(`type`, `area`),
    INDEX `properties_price_bedrooms_idx`(`price`, `bedrooms`),
    INDEX `properties_price_area_idx`(`price`, `area`),
    INDEX `properties_bedrooms_area_idx`(`bedrooms`, `area`),
    INDEX `properties_type_price_bedrooms_area_idx`(`type`, `price`, `bedrooms`, `area`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
