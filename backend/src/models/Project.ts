import { prisma } from '../infrastructure/prisma';

export async function createProject(project: Omit<any, 'id'>) {
  return prisma.project.create({ data: project });
}

export async function getProjectsByUser(userId: number) {
  return prisma.project.findMany({ where: { userId } });
}

export async function getProjectById(id: number) {
  return prisma.project.findUnique({ where: { id } });
}

export async function updateProject(id: number, fields: any) {
  return prisma.project.update({ where: { id }, data: fields });
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
}
