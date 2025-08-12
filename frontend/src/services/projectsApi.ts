import api from "./api";

export interface Project {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}

export interface AddProjectData {
  repoPath: string;
}

export const projectsAPI = {
  list: () => api.get<Project[]>('/projects'),
  add: (data: AddProjectData) => api.post<Project>('/projects', data),
  update: (id: string, data: AddProjectData) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  refresh: (id: string) => api.put(`/projects/${id}/refresh`)
};