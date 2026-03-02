// import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/client/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding...');

  // await prisma.favorite.deleteMany();
  await prisma.advertisement.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Crear categorías
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Tecnología' },
      { name: 'Hogar' },
      { name: 'Deporte' },
      { name: 'Electrodomésticos' },
      { name: 'Moda' },
    ],
  });

  const allCategories = await prisma.category.findMany();

  const cities = ['Huelva', 'Guadalajara', 'Girona'];

  // Crear usuarios
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'user1',
        email: 'example1@example.com',
        passwordHash: '123456',
        userImage: 'https://i.pravatar.cc/150?img=1',
        location: cities[0],
      },
    }),
    prisma.user.create({
      data: {
        username: 'user2',
        email: 'example2@example.com',
        passwordHash: '123456',
        userImage: 'https://i.pravatar.cc/150?img=2',
        location: cities[1],
      },
    }),
    prisma.user.create({
      data: {
        username: 'user3',
        email: 'example3@example.com',
        passwordHash: '123456',
        userImage: 'https://i.pravatar.cc/150?img=3',
        location: cities[2],
      },
    }),
  ]);

  const adsData = [
    { title: 'MacBook Air M3', description: 'Portátil con chip M3', price: 1299 },
    { title: 'PlayStation 5', description: 'Consola última generación', price: 549 },
    { title: 'Samsung QLED 55"', description: 'Smart TV 4K', price: 899 },
    { title: 'Dyson V15 Detect', description: 'Aspiradora inalámbrica', price: 749 },
    { title: 'Nike Pegasus 40', description: 'Zapatillas running', price: 129 },
    { title: 'Canon EOS R6', description: 'Cámara mirrorless', price: 2899 },
    { title: 'Garmin Fenix 7', description: 'Reloj GPS deportivo', price: 699 },
  ];

  for (const user of users) {
    for (let i = 0; i < adsData.length; i++) {
      const randomCategory =
        allCategories[Math.floor(Math.random() * allCategories.length)];

      await prisma.advertisement.create({
        data: {
          title: adsData[i].title,
          description: adsData[i].description,
          price: adsData[i].price,
          location: user.location,
          imageUrl: `https://picsum.photos/seed/${user.username}-${i}/400/300`,
          userId: user.id,
          categoryId: randomCategory.id,
        },
      });
    }
  }

  console.log('✅ Seed completado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
