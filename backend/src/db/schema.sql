CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  confirmation_number VARCHAR(50) UNIQUE NOT NULL,

  -- Cargo details
  cargo_type VARCHAR(100),
  weight DECIMAL(10,2),
  length DECIMAL(10,2),
  width DECIMAL(10,2),
  height DECIMAL(10,2),

  -- Addresses
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,

  -- Dates
  pickup_date DATE NOT NULL,
  delivery_date DATE,

  -- Contact
  contact_name VARCHAR(200),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(200),

  -- Additional
  special_instructions TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  estimated_cost DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',

  -- Metadata
  idempotency_key VARCHAR(100),
  request_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_idempotency_key ON bookings(idempotency_key);
