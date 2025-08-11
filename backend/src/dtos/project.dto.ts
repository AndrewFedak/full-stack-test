import { z } from 'zod';
import { GitHubProjectData } from '../types';

export const AddProjectDto = z.object({
  repoPath: z.string().regex(/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/, 'Invalid repository path format. Expected: owner/repository'),
});
export type AddProjectInput = z.infer<typeof AddProjectDto>;

export interface CreateProjectData extends GitHubProjectData {
  userId: number;
}
