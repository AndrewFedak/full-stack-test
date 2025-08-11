import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/User';
import { ConflictException, HttpException, UnauthorizedException } from '../exceptions/HttpException';

export async function registerService(email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) throw new ConflictException('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashed);
  return { id: user.id, email: user.email };
}

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new UnauthorizedException('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new UnauthorizedException('Invalid credentials');
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return { token };
}
