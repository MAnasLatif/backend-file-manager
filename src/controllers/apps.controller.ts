import db from '@/config/SQLite';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

export const appsController = {
  // Create a new app
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description } = req.body;

    try {
      if (!name) {
        throw createHttpError(400, 'Missing required field: name');
      }

      const key = uuidv4().replace(/-/g, '');
      const signature = uuidv4().replace(/-/g, '');

      const queries = db.prepare(`
        INSERT INTO apps (key, signature, name, description)
        VALUES (?, ?, ?, ?)
      `);

      await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(key, signature, name, description || ''));
        } catch (err) {
          reject(err);
        }
      });

      res.status(201).json({ key, signature });
    } catch (error) {
      next(error);
    }
  },

  // Update an app
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;
    const { name, description } = req.body;

    try {
      if (!name) {
        throw createHttpError(400, 'Missing required fields: name');
      }

      const queries = db.prepare(`
        UPDATE apps
        SET name = ?, description = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE key = ?
      `);

      const result = await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(name, description || '', key));
        } catch (err) {
          reject(err);
        }
      });

      if ((result as any).changes === 0) {
        throw createHttpError(404, 'App not found');
      }

      res.json({ message: 'App updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Get a single app
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;

    try {
      const queries = db.prepare('SELECT * FROM apps WHERE key = ? AND deletedAt IS NULL');
      const app = await new Promise((resolve, reject) => {
        try {
          resolve(queries.get(key));
        } catch (err) {
          reject(err);
        }
      });

      if (!app) {
        throw createHttpError(404, 'App not found');
      }

      res.json(app);
    } catch (error) {
      next(error);
    }
  },

  // List all apps
  index: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page

    try {
      // Parse query parameters and calculate offset
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const offset = (pageNum - 1) * limitNum;

      if (pageNum < 1 || limitNum < 1) {
        throw createHttpError(400, 'Page and limit must be positive integers');
      }

      // Query to fetch paginated results
      const queries = db.prepare(`
      SELECT * FROM apps
      WHERE deletedAt IS NULL
      LIMIT ? OFFSET ?
    `);

      const apps = await new Promise((resolve, reject) => {
        try {
          resolve(queries.all(limitNum, offset));
        } catch (err) {
          reject(err);
        }
      });

      // Query to fetch total count for pagination metadata
      const countQuery = db.prepare(`
      SELECT COUNT(*) as total FROM apps WHERE deletedAt IS NULL
    `);
      const { total } = countQuery.get() as { total: number };

      res.json({
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        data: apps,
      });
    } catch (error) {
      next(error);
    }
  },

  // Soft delete an app
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;

    try {
      const queries = db.prepare(`
        UPDATE apps
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE key = ?
      `);

      const result = await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(key));
        } catch (err) {
          reject(err);
        }
      });

      if ((result as any).changes === 0) {
        throw createHttpError(404, 'App not found');
      }

      res.json({ message: 'App deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Block an app
  block: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;

    try {
      const queries = db.prepare(`
        UPDATE apps
        SET blockedAt = CURRENT_TIMESTAMP
        WHERE key = ?
      `);

      const result = await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(key));
        } catch (err) {
          reject(err);
        }
      });

      if ((result as any).changes === 0) {
        throw createHttpError(404, 'App not found');
      }

      res.json({ message: 'App blocked successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Unblock an app
  unblock: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;

    try {
      const queries = db.prepare(`
      UPDATE apps
      SET blockedAt = NULL
      WHERE key = ?
    `);

      const result = await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(key));
        } catch (err) {
          reject(err);
        }
      });

      if ((result as any).changes === 0) {
        throw createHttpError(404, 'App not found');
      }

      res.json({ message: 'App unblocked successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Update an app's signature
  updateSignature: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { key } = req.params;

    try {
      // Generate a new signature without dashes
      const newSignature = uuidv4().replace(/-/g, '');

      // Update the app's signature in the database
      const queries = db.prepare(`
      UPDATE apps
      SET Signature = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE key = ? AND deletedAt IS NULL
    `);

      const result = await new Promise((resolve, reject) => {
        try {
          resolve(queries.run(newSignature, key));
        } catch (err) {
          reject(err);
        }
      });

      // Check if the app exists and was updated
      if ((result as any).changes === 0) {
        throw createHttpError(404, 'App not found or has been deleted');
      }

      res.json({ message: 'Signature updated successfully', newSignature });
    } catch (error) {
      next(error);
    }
  },
};

export default appsController;
