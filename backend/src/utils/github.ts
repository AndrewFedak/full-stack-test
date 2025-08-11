import axios from 'axios';
import { ValidationException, NotFoundException, ForbiddenException } from '../exceptions/HttpException';
import { GitHubRepository, GitHubProjectData } from '../types/github';

/**
 * Validates repository path format
 * @param repoPath - Repository path to validate
 * @returns boolean - True if valid format
 */
export function validateRepositoryPath(repoPath: string): boolean {
  const repoPathRegex = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;
  return repoPathRegex.test(repoPath);
}

/**
 * Fetches repository data from GitHub API
 * @param repoPath - Repository path in format "owner/repository"
 * @returns Promise<GitHubProjectData> - Transformed repository data
 * @throws ValidationException - When repository path is invalid
 * @throws NotFoundException - When repository is not found
 * @throws ForbiddenException - When GitHub API rate limit is exceeded
 */
export async function fetchRepositoryData(repoPath: string): Promise<GitHubProjectData> {
  if (!validateRepositoryPath(repoPath)) {
    throw new ValidationException('Invalid repository path format. Expected: owner/repository');
  }

  try {
    const response = await axios.get<GitHubRepository>(`https://api.github.com/repos/${repoPath}`);
    const data = response.data;
    
    return {
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Repository not found on GitHub');
      }
      if (error.response?.status === 403) {
        throw new ForbiddenException('GitHub API rate limit exceeded');
      }
    }
    throw new ValidationException('Failed to fetch repository from GitHub');
  }
}
