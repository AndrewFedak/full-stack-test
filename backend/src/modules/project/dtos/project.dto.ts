import { z } from 'zod';

export const AddProjectDto = z.object({
  repoPath: z.string().regex(/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/, 'Invalid repository path format. Expected: owner/repository'),
});

export const ProjectResponseDto = z.object({
  id: z.string(),
  owner: z.string(),
  name: z.string(),
  url: z.string().url(),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  issues: z.number().int().nonnegative(),
  createdAt: z.number().int().nonnegative(),
}).strip();

export type ProjectResponse = z.infer<typeof ProjectResponseDto>;
export type AddProjectInput = z.infer<typeof AddProjectDto>;
