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

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      providerAccountId TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      UNIQUE(provider, providerAccountId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
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
  async get(query: string, params: any[] = []) {
    const dbInstance = await getDb();
    const result = await dbInstance.execO(query, params);
    return result[0];
  },

  async all(query: string, params: any[] = []) {
    const dbInstance = await getDb();
    return dbInstance.execO(query, params);
  },

  async run(query: string, params: any[] = []) {
    const dbInstance = await getDb();
    return dbInstance.exec(query, params);
  },

  async user() {
    return {
      async findUnique({ where }: { where: { email: string } }) {
        return this.get(
          'SELECT * FROM users WHERE email = ?',
          [where.email]
        );
      },

      async create({ data }: { data: any }) {
        const id = nanoid();
        const now = Date.now();
        await this.run(`
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
        
        await this.run(`
          UPDATE users 
          SET ${sets}, updatedAt = ?
          WHERE email = ?
        `, [...Object.values(data), now, where.email]);
        
        return this.findUnique({ where });
      }
    };
  }
};