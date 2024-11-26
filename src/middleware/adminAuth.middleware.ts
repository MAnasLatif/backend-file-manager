import config from '@/config';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw createHttpError(401, 'Authorization header is missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw createHttpError(400, 'Invalid authorization format. Expected "Bearer <token>"');
    }

    const token = authHeader.split(' ')[1];

    if (token !== config.get('ADMIN_TOKEN')) {
      throw createHttpError(403, 'Invalid Bearer token');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default adminAuth;
