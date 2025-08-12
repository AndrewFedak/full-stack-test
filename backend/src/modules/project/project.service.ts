import { fetchRepositoryData } from './github.service';

import { NotFoundException } from '../../exceptions/HttpException';

import { createProject, getProjectsByUser, getProjectById, updateProject, deleteProject } from './project.repository';

export async function addProjectService(repoPath: string, userId: string) {
  const gitHubRepositoryData = await fetchRepositoryData(repoPath);
  return await createProject({
    ...gitHubRepositoryData,
    userId,
  });
}

export async function listProjectsService(userId: string) {
  return getProjectsByUser(userId);
}

export async function updateProjectService(id: string, repoPath: string) {
  const projectData = await getProjectById(id);
  if (!projectData) {
    throw new NotFoundException('Project not found')
  }
  const gitHubRepositoryData = await fetchRepositoryData(repoPath);
  return await updateProject(id, gitHubRepositoryData)
}


export async function removeProjectService(id: string) {
  return deleteProject(id);
}
