import { prisma } from '../infrastructure/prisma';
import { CreateProjectData } from '../dtos/project.dto';
import { Project } from '../types';

export async function createProject(project: CreateProjectData): Promise<Project> {
  return prisma.project.create({ data: project });
}

export async function getProjectsByUser(userId: number): Promise<Project[]> {
  return prisma.project.findMany({ where: { userId } });
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.project.delete({ where: { id } });
}
