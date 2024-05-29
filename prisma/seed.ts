import { faker } from "@faker-js/faker";
import { PrismaClient, PropertyType } from "@prisma/client";

const prisma = new PrismaClient();
const BATCH_SIZE = 1_00_000;
const TOTAL_ROWS = 10_00_000; // 1 million rows

const seed = async () => {
  console.log("Starting to seed data...");
  try {
    for (let batch = 0; batch < TOTAL_ROWS / BATCH_SIZE; batch++) {
      const properties = Array.from({ length: BATCH_SIZE }, () => ({
        project: faker.company.name(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        price: parseFloat(
          faker.commerce.price({ min: 50000, max: 500000, dec: 2 })
        ),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        area: parseFloat(faker.number.float({ min: 30, max: 500 }).toFixed(2)),
        type: faker.helpers.arrayElement([
          PropertyType.SALE,
          PropertyType.RENT,
        ]),
        images: JSON.stringify(
          Array.from({ length: 5 }, () => faker.image.url())
        ),
      }));

      await prisma.properties.createMany({
        data: properties,
      });

      console.log(`Inserted ${BATCH_SIZE * (batch + 1)} properties`);
    }

    console.log("Seeding finished");
  } catch (err) {
    console.error(`Error stack trace =>`, err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

(async () => await seed())();
