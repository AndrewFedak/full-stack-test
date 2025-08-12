import { IUser, User } from "../../infrastructure/models/User";

export class AuthRepository {
  async createUser(email: string, password: string): Promise<IUser> {
    return await User.create({ email, password });
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}
