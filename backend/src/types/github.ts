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

export interface GitHubProjectData {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}
