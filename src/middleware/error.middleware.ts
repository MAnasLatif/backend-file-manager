import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createError from 'http-errors';

import config from '@/config';
import AppError from '@/types/error.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  let statusCode: number = 500;
  let data = {
    message: 'Internal server error',
    ...(config.isDev() && { originalError: error.message }),
  };

  if (createError.isHttpError(error)) {
    statusCode = error.status;
    data = {
      message: error.message,
    };
  }

  res.status(statusCode).json(data);
};

export default errorHandler;
