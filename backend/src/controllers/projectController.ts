
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

import { validate } from '../utils/validate';
import { catchAsync } from '../utils/catchAsync';

import { AddProjectDto } from '../dtos/project.dto';

import {
  addProjectService,
  listProjectsService,
  updateProjectService,
  removeProjectService
} from '../services/projectService';

export const addProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const { repoPath } = validate(AddProjectDto, req.body);
  const project = await addProjectService(repoPath, req.user!.id);
  res.status(201).json(project);
});

export const listProjects = catchAsync(async (req: AuthRequest, res: Response) => {
  const projects = await listProjectsService(req.user!.id);
  res.json(projects);
});

export const updateProjectData = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { repoPath } = validate(AddProjectDto, req.body);
  const updated = await updateProjectService(id, repoPath);
  res.json(updated);
});

export const removeProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await removeProjectService(id);
  res.status(204).send();
});
