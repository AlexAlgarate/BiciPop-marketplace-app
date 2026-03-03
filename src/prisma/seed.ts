import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/client/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type AdSeed = {
  title: string;
  description: string;
  price: number;
  category: string;
};

async function main() {
  console.log('🌱 Seeding...');

  await prisma.advertisement.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categoryNames = ['Tecnología', 'Hogar', 'Deporte', 'Electrodomésticos', 'Moda'];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const categoryMap = new Map(categories.map((cat) => [cat.name, cat.id]));

  // Crear usuarios
  const cities = ['Huelva', 'Guadalajara', 'Girona'];

  const users = await Promise.all(
    [
      {
        username: 'user1',
        email: 'example1@example.com',
        avatar: 1,
        location: cities[0],
      },
      {
        username: 'user2',
        email: 'example2@example.com',
        avatar: 2,
        location: cities[1],
      },
      {
        username: 'user3',
        email: 'example3@example.com',
        avatar: 3,
        location: cities[2],
      },
    ].map((u) =>
      prisma.user.create({
        data: {
          username: u.username,
          email: u.email,
          passwordHash: '123456',
          userImage: `https://i.pravatar.cc/150?img=${u.avatar}`,
          location: u.location,
        },
      }),
    ),
  );

  const adsData: AdSeed[] = [
    // Tecnología
    {
      title: 'MacBook Air M3',
      description: 'Portátil Apple con chip M3, 8GB RAM, 256GB SSD',
      price: 1299,
      category: 'Tecnología',
    },
    {
      title: 'iPhone 15 Pro',
      description: 'Smartphone 128GB titanio natural',
      price: 1219,
      category: 'Tecnología',
    },
    {
      title: 'PlayStation 5',
      description: 'Consola Sony con lector Blu-ray',
      price: 549,
      category: 'Tecnología',
    },
    {
      title: 'Canon EOS R6',
      description: 'Cámara mirrorless full-frame 20MP',
      price: 2899,
      category: 'Tecnología',
    },

    // Hogar
    {
      title: 'Sofá Chaise Longue IKEA',
      description: 'Sofá 3 plazas gris claro',
      price: 799,
      category: 'Hogar',
    },
    {
      title: 'Mesa de comedor roble macizo',
      description: 'Mesa 180cm estilo nórdico',
      price: 599,
      category: 'Hogar',
    },

    // Electrodomésticos
    {
      title: 'Dyson V15 Detect',
      description: 'Aspiradora inalámbrica con láser',
      price: 749,
      category: 'Electrodomésticos',
    },
    {
      title: 'Samsung QLED 55"',
      description: 'Smart TV 4K QLED',
      price: 899,
      category: 'Electrodomésticos',
    },
    {
      title: 'Frigorífico LG No Frost',
      description: 'Combi inox clase A++',
      price: 999,
      category: 'Electrodomésticos',
    },

    // Deporte
    {
      title: 'Nike Pegasus 40',
      description: 'Zapatillas running hombre',
      price: 129,
      category: 'Deporte',
    },
    {
      title: 'Garmin Fenix 7',
      description: 'Reloj GPS multideporte',
      price: 699,
      category: 'Deporte',
    },
    {
      title: 'Bicicleta MTB Orbea Alma',
      description: 'Mountain bike aluminio 29"',
      price: 1199,
      category: 'Deporte',
    },

    // Moda
    {
      title: 'Chaqueta North Face',
      description: 'Chaqueta impermeable negra',
      price: 199,
      category: 'Moda',
    },
    {
      title: 'Levi’s 501 Original',
      description: 'Vaqueros clásicos hombre',
      price: 109,
      category: 'Moda',
    },
  ];

  // const allCategories = await prisma.category.findMany();
  // const categoryMap = new Map(allCategories.map((cat) => [cat.name, cat.id]));

  for (const user of users) {
    for (let i = 0; i < adsData.length; i++) {
      const ad = adsData[i];

      const categoryId = categoryMap.get(ad.category);

      if (!categoryId) throw new Error(`Category not found: ${ad.category}`);

      await prisma.advertisement.create({
        data: {
          title: ad.title,
          description: ad.description,
          price: ad.price,
          location: user.location,
          imageUrl: `https://picsum.photos/seed/${user.username}-${i}/400/300`,
          userId: user.id,
          categoryId: categoryId,
        },
      });
    }
  }

  console.log('✅ Seed completado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
