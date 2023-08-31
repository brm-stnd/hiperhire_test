import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const bookData = (i: number): any => ({
  title: 'Book ' + i,
  writer: 'Bramastana D',
  coverImage:
    'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
  point: 10,
  tag: ['fiction', 'non-fiction'],
});

async function main() {
  const fakerRounds = 25;
  dotenv.config();
  console.log('Seeding...');
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.book.create({ data: bookData(i) });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
