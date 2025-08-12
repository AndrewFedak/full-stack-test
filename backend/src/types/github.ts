import { Project } from "./project";

export interface GitHubRepository {
  owner: {
    login: string;
  };
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
}

export type GitHubProjectData = Omit<Project, 'id' | 'userId'>
