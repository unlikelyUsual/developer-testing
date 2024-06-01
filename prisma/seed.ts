import { AsyncRequest, chunkedPromiseAll } from "@/util/promise";
import { faker } from "@faker-js/faker";
import { PrismaClient, PropertyType } from "@prisma/client";

const prisma = new PrismaClient();
const BATCH_SIZE = 50_000;
const TOTAL_ROWS = 10_00_000; // 1 million rows

const images = [
  "https://loremflickr.com/640/480?lock=4340480796000256",
  "https://loremflickr.com/640/480?lock=1121878999564288",
  "https://picsum.photos/seed/aPezNbq/640/480",
  "https://loremflickr.com/640/480?lock=7189725353869312",
  "https://loremflickr.com/640/480?lock=1121878999564288",
  // "https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/Futuristic-Construction-Hero-image-1.webp",
  // "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/640px-Dubai_Marina_Skyline.jpg",
  // "https://img.freepik.com/premium-photo/geometric-facades-residential-building_294094-27.jpg",
];

const getRandomData = () => ({
  project: faker.company.name(),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  price: parseFloat(faker.commerce.price({ min: 5000, max: 15000, dec: 2 })),
  bedrooms: faker.number.int({ min: 1, max: 5 }),
  thumbnail: faker.helpers.arrayElement(images),
  area: faker.number.int({ min: 100, max: 2500 }),
  type: faker.helpers.arrayElement([PropertyType.SALE, PropertyType.RENT]),
  images: JSON.stringify(
    Array.from({ length: 5 }, () => faker.helpers.arrayElement(images))
  ),
});

const seed = async () => {
  console.log("Starting to seed data...");
  const chunks: AsyncRequest[] = [];
  try {
    for (let batch = 0; batch < TOTAL_ROWS / BATCH_SIZE; batch++) {
      const properties = Array.from({ length: BATCH_SIZE }, () =>
        getRandomData()
      );

      chunks.push(
        prisma.properties.createMany({
          data: properties,
        })
      );
    }

    await chunkedPromiseAll(chunks, 3);

    console.log("Seeding finished");
  } catch (err) {
    console.error(`Error stack trace =>`, err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

(async () => await seed())();
