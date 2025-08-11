import { createUser, findUserByEmail } from '../models/User';
import { ConflictException, UnauthorizedException } from '../exceptions/HttpException';
import { UserResponse, LoginResponse } from '../dtos/auth.dto';
import { hashPassword, comparePassword } from '../utils/crypto';
import { generateToken } from '../utils/jwt';

export async function registerService(email: string, password: string): Promise<UserResponse> {
  const existing = await findUserByEmail(email);
  if (existing) throw new ConflictException('User already exists');
  
  const hashedPassword = await hashPassword(password);
  const user = await createUser(email, hashedPassword);
  
  return { id: user.id, email: user.email };
}

export async function loginService(email: string, password: string): Promise<LoginResponse> {
  const user = await findUserByEmail(email);
  if (!user) throw new UnauthorizedException('Invalid credentials');
  
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');
  
  const token = generateToken(user.id);
  return { token };
}
