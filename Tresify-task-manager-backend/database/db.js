const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'tresify.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Personal',
    priority TEXT DEFAULT 'Medium',
    dueDate TEXT,
    completed INTEGER DEFAULT 0,
    userId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`);

console.log('✅ Connected to SQLite database');
console.log('✅ Database tables ready');

module.exports = db;