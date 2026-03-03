import prisma from './prisma';
import { AuthUser, UserDto } from './user.types';

export const getUserByEmail = async (email: string): Promise<UserDto | null> => {
  const userDb = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });
  if (!userDb) return null;

  return {
    id: userDb.id,
    email: userDb.email,
  };
};

export const getAuthUserByEmail = async (email: string): Promise<AuthUser | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
    },
  });
};
