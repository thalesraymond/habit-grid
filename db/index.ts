import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('habitgrid.db');

export const initDb = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      photoUrl TEXT
    );
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      targetPerWeek INTEGER NOT NULL,
      color TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS habit_logs (
      habitId TEXT NOT NULL,
      date TEXT NOT NULL,
      PRIMARY KEY (habitId, date),
      FOREIGN KEY (habitId) REFERENCES habits (id) ON DELETE CASCADE
    );
  `);
};
