import Database from "better-sqlite3";

export const db = new Database("lib/database/files.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        uploaded_at TEXT NOT NULL,
        size INTEGER,
        mime_type TEXT
    )
`);
