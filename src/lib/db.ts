import initSqlJs, { Database } from "sql.js";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let _db: Database | null = null;

export async function getDB(): Promise<Database> {
  if (_db) return _db;

  const SQL = await initSqlJs();

  // Load dari file kalau ada, buat baru kalau belum
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _db = new SQL.Database(fileBuffer);
  } else {
    _db = new SQL.Database();
  }

  // Simpan ke disk setiap ada perubahan
  function save() {
    const data = _db!.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }

  _db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT    NOT NULL UNIQUE,
      password   TEXT    NOT NULL,
      role       TEXT    NOT NULL DEFAULT 'viewer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const res = _db.exec("SELECT id FROM users WHERE username = 'admin'");
  if (res.length === 0 || res[0].values.length === 0) {
    const hashed = bcrypt.hashSync("admin", 12);
    _db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
      "admin", hashed, "admin",
    ]);
    console.log("[DB] Seed: user admin dibuat.");
  }

  save();

  // Wrap run agar auto-save
  const originalRun = _db.run.bind(_db);
  _db.run = (...args: Parameters<Database["run"]>) => {
    const result = originalRun(...args);
    save();
    return result;
  };

  return _db;
}