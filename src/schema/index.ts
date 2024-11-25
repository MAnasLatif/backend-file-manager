import db from '@/config/SQLite';

// Function to initialize the database schema
const initializeSchema = (): void => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS apps (
      key TEXT PRIMARY KEY,
      signature TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT DEFAULT empty,
      blockedAt DATETIME DEFAULT NULL,
      deletedAt DATETIME DEFAULT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export default initializeSchema;
