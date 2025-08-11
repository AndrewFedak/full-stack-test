import { prisma } from '../infrastructure/prisma';

export async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: { email, password }
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}
