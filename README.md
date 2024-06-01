# Property Search

## Built with Next.js with Prisma, MySQL, and Apollo Client

This repository contains a sample setup for a Next.js application using Prisma as the ORM, MySQL as the database, and Apollo Client for GraphQL.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js and npm (or Yarn) installed on your machine

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/unlikelyUsual/developer-testing.git
cd developer-testing

```

### 2. Run the docker compose file

```sh
docker-compose up
```

### 3. Look out for seeding of database (takes around 3-4 min for 1 million rows)
<img width="612" alt="Screenshot 2024-05-31 at 12 35 29 PM" src="https://github.com/unlikelyUsual/developer-testing/assets/23253492/91ad0997-804c-46d5-b44a-f24ca26fd128">


### 4. Server started at localhost:3000

![image](https://github.com/unlikelyUsual/developer-testing/assets/23253492/4c7aa09f-2b1d-45ee-8218-792ac6d0cac7)

### 5. Click on Search button with filter update
- It redirect to same page with new filters value in query parameter as Json stringified

### 6. Click on card to view the property detail
![7d1884138b4f45d57869b66eae308082](https://github.com/unlikelyUsual/developer-testing/assets/23253492/c5b52593-d9e4-4d71-ba54-c2a86464f577)


## Details

### Table Schema

```sql
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

```

- For handling large scale of 1 million rows search, I've created combination of index on all the relevant filter fields

### Wait for it script for running seed command until mysql container is live

```bash
./wait-for-it.sh mysql:3306 -- npm run deploy && npm run start
```
