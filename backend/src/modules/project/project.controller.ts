import { Response, Router } from "express";
import { AuthRequest, authenticateToken } from "../../middleware/auth";
import { validate } from "../../utils/validate";
import { catchAsync } from "../../utils/catchAsync";

import { AddProjectDto } from "./dtos/project.dto";

import { ProjectService } from "./project.service";

export class ProjectController {
  public router: Router;

  constructor(private readonly projectService: ProjectService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", authenticateToken, catchAsync(this.addProject.bind(this)));
    this.router.get("/", authenticateToken, catchAsync(this.listProjects.bind(this)));
    this.router.put("/:id", authenticateToken, catchAsync(this.updateProjectData.bind(this)));
    this.router.put("/:id/refresh", authenticateToken, catchAsync(this.refreshProjectData.bind(this)));
    this.router.delete("/:id", authenticateToken, catchAsync(this.removeProject.bind(this)));
  }

  private async addProject(req: AuthRequest, res: Response) {
    const { repoPath } = validate(AddProjectDto, req.body);

    const project = await this.projectService.addProject(repoPath, req.user!.id);

    res.status(201).json(project);
  }

  private async listProjects(req: AuthRequest, res: Response) {
    const projects = await this.projectService.listProjects(req.user!.id);

    res.json(projects);
  }
  
  private async updateProjectData(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { repoPath } = validate(AddProjectDto, req.body);

    await this.projectService.updateProject(id, repoPath);

    res.sendStatus(200);
  }

  private async refreshProjectData(req: AuthRequest, res: Response) {
    const { id } = req.params;

    await this.projectService.refreshProject(id);

    res.sendStatus(200);
  }

  private async removeProject(req: AuthRequest, res: Response) {
    const { id } = req.params;

    await this.projectService.removeProject(id);

    res.sendStatus(200)
  }
}