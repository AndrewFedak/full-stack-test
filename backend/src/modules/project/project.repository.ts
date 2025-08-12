import { IProject, Project } from "../../infrastructure/models/Project";

import { GitHubProjectData } from "../../types";

import { CreateProjectData } from "./dtos/project.dto";

export async function createProject(project: CreateProjectData): Promise<IProject> {
  return Project.create(project);
}

export async function updateProject(id: string, project: GitHubProjectData): Promise<IProject | null> {
  return await Project.findByIdAndUpdate(id, project, { new: true });
}

export async function getProjectsByUser(userId: string): Promise<IProject[]> {
  return Project.find({ userId });
}

export async function getProjectById(id: string): Promise<IProject | null> {
  return Project.findById(id);
}

export async function deleteProject(id: string): Promise<void> {
  await Project.findByIdAndDelete(id);
}
