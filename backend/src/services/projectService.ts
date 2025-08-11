import axios from 'axios';
import { createProject, getProjectsByUser, updateProject, deleteProject } from '../models/Project';
import { HttpException } from '../exceptions/HttpException';

export async function addProjectService(repoPath: string, userId: number) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
    const data = response.data;
    return await createProject({
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
      userId,
    });
  } catch (err) {
    throw new HttpException(400, 'Failed to fetch repository from GitHub');
  }
}

export async function listProjectsService(userId: number) {
  return getProjectsByUser(userId);
}

export async function updateProjectService(id: number, repoPath: string) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
    const data = response.data;
    return await updateProject(Number(id), {
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
    });
  } catch (err) {
    throw new HttpException(400, 'Failed to update project from GitHub');
  }
}

export async function removeProjectService(id: number) {
  return deleteProject(Number(id));
}
