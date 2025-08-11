import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { CreateProjectData, UpdateProjectData } from '../../dtos/project.dto';
import { GitHubProjectData } from '../../types';

export interface IProject extends Document {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  userId: string;
  createdAt: number;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  _id: {
    type: String,
    default: uuidv4,
  },
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    default: 0
  },
  forks: {
    type: Number,
    required: true,
    default: 0
  },
  issues: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  }
}, {
  timestamps: false,
  toJSON: {
    virtuals: true, // ensures `id` appears in JSON
  },
  toObject: {
    virtuals: true,
  },
});

projectSchema.virtual("id").get(function (this: IProject) {
  return this._id;
});

export const Project = mongoose.model<IProject>('Project', projectSchema);

export async function createProject(project: CreateProjectData): Promise<IProject> {
  return Project.create(project);
}

export async function updateProject(id: string, project: GitHubProjectData): Promise<IProject | null> {
  return await Project.findByIdAndUpdate(id, project, { new: true });
}

export async function getProjectsByUser(userId: string): Promise<IProject[]> {
  return Project.find({ userId });
}

export async function getProjectById(id: string): Promise<IProject | null> {
  return Project.findById(id);
}

export async function deleteProject(id: string): Promise<void> {
  await Project.findByIdAndDelete(id);
}
