import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/client/client';
import { hashPassword } from '@/app/auth/utils/securityService';

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

  const categoryNames = [
    'Carretera',
    'Montaña (MTB)',
    'Gravel / CX',
    'Endurance',
    'Aero',
    'Descenso (DH)',
    'Triatlón / TT',
    'Pista / Fixie',
    'BMX / Dirt',
    'Urbana / Paseo',
    'Infantil',
    'Eléctrica',
    'Otros',
  ];

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
        username: 'user 1',
        email: 'example1@example.com',
        avatar: 1,
        location: cities[0],
      },
      {
        username: 'user 2',
        email: 'example2@example.com',
        avatar: 2,
        location: cities[1],
      },
      {
        username: 'user 3',
        email: 'example3@example.com',
        avatar: 3,
        location: cities[2],
      },
      {
        username: 'user 4',
        email: 'example4@example.com',
        avatar: 4,
        location: cities[0],
      },
      {
        username: 'user 5',
        email: 'example5@example.com',
        avatar: 5,
        location: cities[1],
      },
      {
        username: 'user 6',
        email: 'example6@example.com',
        avatar: 6,
        location: cities[2],
      },
    ].map(async (u) =>
      prisma.user.create({
        data: {
          username: u.username,
          email: u.email,
          passwordHash: await hashPassword('123456'),
          userImage: `https://i.pravatar.cc/150?img=${u.avatar}`,
          location: u.location,
        },
      }),
    ),
  );

  const adsData: AdSeed[] = [
    // Carretera
    {
      title: 'Specialized Allez Elite',
      description: 'Bici de carretera de aluminio muy ligera, grupo Shimano 105.',
      price: 1100,
      category: 'Carretera',
    },
    {
      title: 'Giant TCR Advanced 2',
      description: 'Cuadro carbono, ideal para entrenamientos y marchas.',
      price: 1900,
      category: 'Carretera',
    },

    // Montaña
    {
      title: 'Orbea Alma H30',
      description: 'MTB rígida 29", Shimano Deore, muy cuidada.',
      price: 1200,
      category: 'Montaña (MTB)',
    },
    {
      title: 'Trek X-Caliber 9',
      description: 'Mountain bike XC con horquilla RockShox.',
      price: 950,
      category: 'Montaña (MTB)',
    },

    // Gravel / CX
    {
      title: 'Specialized Diverge Comp',
      description: 'Gravel muy versátil para aventura y bikepacking.',
      price: 2100,
      category: 'Gravel / CX',
    },
    {
      title: 'Cannondale Topstone 3',
      description: 'Bici gravel aluminio con grupo Shimano GRX.',
      price: 1400,
      category: 'Gravel / CX',
    },

    // Endurance
    {
      title: 'Trek Domane SL5',
      description: 'Bici endurance muy cómoda para largas distancias.',
      price: 2600,
      category: 'Endurance',
    },
    {
      title: 'Specialized Roubaix Sport',
      description: 'Carretera gran fondo con Future Shock.',
      price: 2400,
      category: 'Endurance',
    },

    // Aero
    {
      title: 'Canyon Aeroad CF SLX',
      description: 'Bici aero de carbono con Ultegra Di2.',
      price: 4200,
      category: 'Aero',
    },
    {
      title: 'Scott Foil RC',
      description: 'Bici aero competición muy rápida.',
      price: 3900,
      category: 'Aero',
    },

    // Descenso
    {
      title: 'Santa Cruz V10',
      description: 'Bici de descenso profesional usada en bike parks.',
      price: 4300,
      category: 'Descenso (DH)',
    },
    {
      title: 'Commencal Supreme DH',
      description: 'Downhill muy robusta, perfecta para saltos.',
      price: 3500,
      category: 'Descenso (DH)',
    },

    // Triatlón / TT
    {
      title: 'Cervélo P-Series',
      description: 'Bici de contrarreloj ideal para triatlón.',
      price: 3200,
      category: 'Triatlón / TT',
    },
    {
      title: 'Cube Aerium C68',
      description: 'Bici cabra con posición muy aerodinámica.',
      price: 2800,
      category: 'Triatlón / TT',
    },

    // Pista / Fixie
    {
      title: 'Cinelli Vigorelli',
      description: 'Fixie de acero muy popular en ciudad.',
      price: 850,
      category: 'Pista / Fixie',
    },
    {
      title: 'State Bicycle Co. 6061',
      description: 'Single speed ligera para uso urbano.',
      price: 600,
      category: 'Pista / Fixie',
    },

    // BMX
    {
      title: 'Cult Gateway BMX',
      description: 'BMX freestyle ideal para street.',
      price: 450,
      category: 'BMX / Dirt',
    },
    {
      title: 'Sunday Primer BMX',
      description: 'BMX para park y dirt jump.',
      price: 420,
      category: 'BMX / Dirt',
    },

    // Urbana
    {
      title: 'Brompton M6L',
      description: 'Bici urbana plegable muy práctica.',
      price: 1100,
      category: 'Urbana / Paseo',
    },
    {
      title: 'Decathlon Elops 520',
      description: 'Bicicleta de paseo con cesta y portabultos.',
      price: 320,
      category: 'Urbana / Paseo',
    },

    // Infantil
    {
      title: 'Woom 3',
      description: 'Bici infantil ultraligera para niños de 4-6 años.',
      price: 350,
      category: 'Infantil',
    },
    {
      title: 'Orbea Grow 2',
      description: 'Bici infantil ajustable según crece el niño.',
      price: 280,
      category: 'Infantil',
    },

    // Eléctrica
    {
      title: 'Specialized Turbo Levo',
      description: 'E-MTB con batería de larga duración.',
      price: 5200,
      category: 'Eléctrica',
    },
    {
      title: 'Cube Kathmandu Hybrid',
      description: 'E-bike trekking perfecta para ciudad y rutas.',
      price: 3100,
      category: 'Eléctrica',
    },

    // Otros
    {
      title: 'Bicicleta Tándem Trek',
      description: 'Bicicleta doble para dos personas.',
      price: 1500,
      category: 'Otros',
    },
    {
      title: 'Triciclo adulto con cesta',
      description: 'Triciclo estable ideal para ciudad.',
      price: 650,
      category: 'Otros',
    },
  ];

  const bikeImages = [
    'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
    'https://images.unsplash.com/photo-1728454994668-62f1c3b56e78',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    'https://images.unsplash.com/photo-1727433836544-cf57feeb0f21',
    'https://images.unsplash.com/photo-1630736701814-4778b0ab30e6',
  ];
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
          imageUrl: `${bikeImages[i % bikeImages.length]}?w=400&h=300&fit=crop`,
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
