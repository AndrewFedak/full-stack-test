import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDatabase, disconnectFromDatabase } from "./infrastructure/mongodb";
import { errorHandler } from "./middleware/errorHandler";

import { AuthRepository } from "./modules/auth/auth.repository";
import { AuthService } from "./modules/auth/auth.service";
import { AuthController } from "./modules/auth/auth.controller";

import { ProjectRepository } from "./modules/project/project.repository";
import { GitHubService } from "./modules/project/github.service";
import { ProjectService } from "./modules/project/project.service";
import { ProjectController } from "./modules/project/project.controller";

dotenv.config();

class App {
  private app: Application;
  private readonly port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private configureRoutes() {
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);

    const projectRepository = new ProjectRepository();
    const gitHubService = new GitHubService();
    const projectService = new ProjectService(projectRepository, gitHubService);
    const projectController = new ProjectController(projectService);

    this.app.use("/api/auth", authController.router);
    this.app.use("/api/projects", projectController.router);
  }

  private configureErrorHandling() {
    this.app.use(errorHandler);
  }

  public async start() {
    try {
      await connectToDatabase();

      const server = this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });

      this.handleShutdown(server);
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  private handleShutdown(server: import("http").Server) {
    const shutdown = async (signal: string) => {
      console.log(`${signal} received, shutting down gracefully`);
      server.close(async () => {
        await disconnectFromDatabase();
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }
}

const appInstance = new App();
appInstance.start();
