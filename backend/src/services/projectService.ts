import { createProject, getProjectsByUser, deleteProject } from '../models/Project';
import { fetchRepositoryData } from '../utils/github';

export async function addProjectService(repoPath: string, userId: number) {
  const projectData = await fetchRepositoryData(repoPath);
  return await createProject({
    ...projectData,
    userId,
  });
}

export async function listProjectsService(userId: number) {
  return getProjectsByUser(userId);
}

export async function removeProjectService(id: number) {
  return deleteProject(id);
}
