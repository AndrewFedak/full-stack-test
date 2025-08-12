import { NotFoundException } from "../../exceptions/HttpException";
import { validate } from "../../utils/validate";

import { ProjectResponse, ProjectResponseDto } from "./dtos/project.dto";

import { GitHubService } from "./github.service";

import { IProjectRepository } from "./project.repository";

export class ProjectService {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly gitHubService: GitHubService
  ) {}

  public async addProject(repoPath: string, userId: string): Promise<void> {
    const gitHubRepositoryData = await this.gitHubService.fetchRepositoryData(repoPath);
  
    await this.projectRepository.createProject(userId, gitHubRepositoryData)
  }

  public async listProjects(userId: string): Promise<ProjectResponse[]> {
    const projects = await this.projectRepository.getProjectsByUser(userId)

    return projects.map(project => validate(ProjectResponseDto, project));
  }

  public async updateProject(id: string, repoPath: string): Promise<void> {
    const projectData = await this.projectRepository.getProjectById(id);
    if (!projectData) {
      throw new NotFoundException("Project not found");
    }

    const gitHubRepositoryData = await this.gitHubService.fetchRepositoryData(repoPath);

    const updated = await this.projectRepository.updateProject(id, gitHubRepositoryData);

    if (updated === null) {
      throw new NotFoundException(`Project with id ${id} not found or could not be updated`)
    }
  }

  public async refreshProject(id: string): Promise<void> {
    const projectData = await this.projectRepository.getProjectById(id);
    if (!projectData) {
      throw new NotFoundException("Project not found");
    }
    const repoPath = this.gitHubService.buildRepositoryPath(projectData.owner, projectData.name);
    const gitHubRepositoryData = await this.gitHubService.fetchRepositoryData(repoPath);

    const refreshed = await this.projectRepository.updateProject(id, gitHubRepositoryData);

    if (refreshed === null) {
      throw new NotFoundException(`Project with id ${id} not found or could not be refreshed`)
    }
  }

  public async removeProject(id: string): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }
}
