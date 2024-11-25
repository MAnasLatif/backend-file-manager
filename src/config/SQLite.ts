import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import config from '@/config';

let DBPath: string = config.get('DB_PATH');

if (DBPath === 'default') {
  DBPath = `${config.get('DATA_FILE')}/private/db/`;
}

// Define the database file path
const dbDirectory: string = path.resolve(DBPath);
const dbPath: string = path.join(dbDirectory, config.get('DB_FILE'));

// Ensure the directory exists
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Initialize the SQLite database with logging
const db: Database.Database = new Database(dbPath, {
  verbose: config.isDev() ? console.log : () => {},
});

export default db;
