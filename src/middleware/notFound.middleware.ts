import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError[404](`not found ${req.method} ${req.url}`));
};

export default notFound;
