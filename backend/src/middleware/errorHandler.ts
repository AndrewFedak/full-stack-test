import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpException) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors || null,
    });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
}
