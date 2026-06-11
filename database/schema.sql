CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'kleihaus_website',
  channel TEXT DEFAULT 'email',
  intent TEXT DEFAULT 'quote',
  status TEXT DEFAULT 'captured',
  anonymous_visitor_id TEXT,
  session_id TEXT,
  lead_reference TEXT,
  journey_summary_json TEXT,
  lead_score INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

-- Privacy-safe backend analytics: anonymous IDs only, no quote form PII.
CREATE TABLE IF NOT EXISTS customer_journey_events (
  id TEXT PRIMARY KEY,
  anonymous_visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  page_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  search_query TEXT,
  clicked_element TEXT,
  product_category TEXT,
  product_name TEXT,
  lead_reference TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_customer_journey_events_session
  ON customer_journey_events (session_id, created_at);

CREATE INDEX IF NOT EXISTS idx_customer_journey_events_lead_reference
  ON customer_journey_events (lead_reference);
