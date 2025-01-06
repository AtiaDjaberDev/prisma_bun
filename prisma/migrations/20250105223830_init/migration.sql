-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `depoys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NULL,
    `montant` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `pay` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `rest` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `remise` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `gift` BOOLEAN NOT NULL DEFAULT false,
    `remark` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `factures_client_id_fkey`(`client_id`),
    INDEX `factures_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `sell_price` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `quantity` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `facture_id` INTEGER NOT NULL,
    `client_id` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 0,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `sell_price` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `total` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `depot_id` INTEGER NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `discount_price` DECIMAL(65, 30) NULL DEFAULT 0.000000000000000000000000000000,

    INDEX `sales_client_id_fkey`(`client_id`),
    INDEX `sales_depot_id_fkey`(`depot_id`),
    INDEX `sales_facture_id_fkey`(`facture_id`),
    INDEX `sales_product_id_fkey`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(255) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `factures` ADD CONSTRAINT `factures_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factures` ADD CONSTRAINT `factures_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_depot_id_fkey` FOREIGN KEY (`depot_id`) REFERENCES `depoys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_facture_id_fkey` FOREIGN KEY (`facture_id`) REFERENCES `factures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
