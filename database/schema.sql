CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'kleihaus_website',
  status TEXT DEFAULT 'captured',
  created_at TEXT NOT NULL
);