import { IUser, User } from "../../infrastructure/models/User";

export interface IAuthRepository {
  createUser(email: string, password: string): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(id: string): Promise<IUser | null>;
}

export class AuthRepository implements IAuthRepository {
  public async createUser(email: string, password: string): Promise<IUser> {
    return await User.create({ email, password });
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  public async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}
