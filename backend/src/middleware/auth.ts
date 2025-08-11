
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';

export interface AuthRequest extends Request {
  user?: { id: number };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) next(new HttpException(401, 'No token provided'));
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) return next(new HttpException(403, 'Invalid token'));
    req.user = { id: user.id };
    next();
  });
}
