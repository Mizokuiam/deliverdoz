const Database = require('better-sqlite3');
const { join } = require('path');
const { randomBytes } = require('crypto');

const db = new Database(join(process.cwd(), 'data.db'));

// Create tables
db.exec(`
  -- Same SQL as in lib/db.ts
  -- Tables creation statements...
`);

// Add some test data
const userId = randomBytes(16).toString('hex');
const now = Date.now();

db.prepare(`
  INSERT OR IGNORE INTO users (id, name, email, role, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?)
`).run(userId, 'Test User', 'test@example.com', 'SENDER', now, now);

console.log('Database setup completed');