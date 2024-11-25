import { Request, Response } from 'express';

export const appsController = {
  create: (req: Request, res: Response) => {
    res.status(200).json({});
  },
  update: (req: Request, res: Response) => {
    res.status(200).json({});
  },
  get: (req: Request, res: Response) => {
    res.status(200).json({});
  },
  index: (req: Request, res: Response) => {
    res.status(200).json({});
  },
  delete: (req: Request, res: Response) => {
    res.status(200).json({});
  },
};

export default appsController;
