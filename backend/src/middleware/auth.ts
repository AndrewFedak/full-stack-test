
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return next(new HttpException(401, 'No token provided'));
  }
  
  try {
    const user = verifyToken(token);
    req.user = { id: user.id };
    next();
  } catch (error) {
    return next(new HttpException(403, 'Invalid token'));
  }
}
