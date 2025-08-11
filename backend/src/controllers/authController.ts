import { Request, Response } from 'express';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { validate } from '../utils/validate';
import { registerService, loginService } from '../services/authService';
import { catchAsync } from '../utils/catchAsync';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = validate(RegisterDto, req.body);
  const user = await registerService(email, password);
  res.status(201).json(user);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = validate(LoginDto, req.body);
  const result = await loginService(email, password);
  res.json(result);
});
