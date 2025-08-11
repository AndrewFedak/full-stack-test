import { z } from 'zod';

export const AddProjectDto = z.object({
  repoPath: z.string().regex(/^[\w-]+\/[\w.-]+$/, 'Invalid repository path'),
});

export type AddProjectInput = z.infer<typeof AddProjectDto>;
