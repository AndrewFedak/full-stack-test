import { z } from 'zod';

export const RegisterDto = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const UserResponseDto = z.object({
  id: z.string(),
  email: z.string().email(),
}).strip();

export const LoginResponseDto = z.object({
  token: z.string(),
}).strip();

export type RegisterInput = z.infer<typeof RegisterDto>;
export type LoginInput = z.infer<typeof LoginDto>;
export type UserResponse = z.infer<typeof UserResponseDto>;
export type LoginResponse = z.infer<typeof LoginResponseDto>;
