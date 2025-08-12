import { IUser, User } from "../../infrastructure/models/User";

export async function createUser(email: string, password: string): Promise<IUser> {
  return User.create({ email, password });
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email });
}

export async function findUserById(id: string): Promise<IUser | null> {
  return User.findById(id);
}