import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

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
