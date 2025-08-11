import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    default: uuidv4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
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

userSchema.virtual("id").get(function (this: IUser) {
  return this._id;
});

export const User = mongoose.model<IUser>('User', userSchema);

export async function createUser(email: string, password: string): Promise<IUser> {
  return User.create({ email, password });
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email });
}

export async function findUserById(id: string): Promise<IUser | null> {
  return User.findById(id);
}
