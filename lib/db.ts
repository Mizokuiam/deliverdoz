import { initDb } from '@vlcn.io/crsqlite-wasm';
import { nanoid } from 'nanoid';

let db: any = null;

export async function getDb() {
  if (db) return db;
  
  const sqlite = await initDb();
  db = await sqlite.open(':memory:');

  // Initialize tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      image TEXT,
      phone TEXT,
      role TEXT DEFAULT 'SENDER',
      emailVerified INTEGER,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      sessionToken TEXT UNIQUE NOT NULL,
      userId TEXT NOT NULL,
      expires INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT NOT NULL,
      expires INTEGER NOT NULL,
      UNIQUE(identifier, token)
    );
  `);

  return db;
}

export const db = {
  async user() {
    const dbInstance = await getDb();
    
    return {
      async findUnique({ where }: { where: { email: string } }) {
        const result = await dbInstance.execO(
          'SELECT * FROM users WHERE email = ?',
          [where.email]
        );
        return result[0];
      },

      async create({ data }: { data: any }) {
        const id = nanoid();
        const now = Date.now();
        await dbInstance.exec(`
          INSERT INTO users (id, name, email, password, phone, role, emailVerified, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [id, data.name, data.email, data.password, data.phone, data.role, null, now, now]);
        
        return this.findUnique({ where: { email: data.email } });
      },

      async update({ where, data }: { where: { email: string }, data: any }) {
        const now = Date.now();
        const sets = Object.entries(data)
          .map(([key]) => `${key} = ?`)
          .join(', ');
        
        await dbInstance.exec(`
          UPDATE users 
          SET ${sets}, updatedAt = ?
          WHERE email = ?
        `, [...Object.values(data), now, where.email]);
        
        return this.findUnique({ where });
      }
    };
  }
};