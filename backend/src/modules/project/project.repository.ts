import { IProject, Project } from "../../infrastructure/models/Project";

import { GitHubProjectData } from "../../types";

export class ProjectRepository {
  public async createProject(userId: string, project: GitHubProjectData): Promise<IProject> {
    return await Project.create({...project, userId});
  }

  public async updateProject(id: string, project: GitHubProjectData): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(id, project, { new: true });
  }

  public async getProjectsByUser(userId: string): Promise<IProject[]> {
    return await Project.find({ userId });
  }

  public async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  }

  public async deleteProject(id: string): Promise<void> {
    await Project.findByIdAndDelete(id);
  }
}
