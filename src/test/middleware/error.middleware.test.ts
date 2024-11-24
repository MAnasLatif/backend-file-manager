import { Request, Response } from 'express';
import createError from 'http-errors';
import errorHandler from '@/middleware/error.middleware';

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should handle HTTP errors', () => {
    const error = createError(404, 'Not Found');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler(error as any, req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });

  it('should handle internal server errors in production environment', () => {
    const error = new Error('Something went wrong');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler(error as any, req as Request, res as Response, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
