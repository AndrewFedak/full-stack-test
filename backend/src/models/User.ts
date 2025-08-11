import { prisma } from '../infrastructure/prisma';
import { User } from '../dtos/auth.dto';

export async function createUser(email: string, password: string): Promise<User> {
  return prisma.user.create({
    data: { email, password }
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
