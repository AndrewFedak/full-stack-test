import { Request, Response, Router } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { validate } from '../../utils/validate';

import { RegisterDto, LoginDto } from './dtos/auth.dto';

import { registerService, loginService } from './auth.service';

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

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;