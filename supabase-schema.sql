-- Run this in Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  confirmation_number VARCHAR(50) UNIQUE NOT NULL,

  -- Cargo details
  cargo_type VARCHAR(100),
  weight VARCHAR(50),
  dimensions VARCHAR(100),

  -- Addresses
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,

  -- Dates
  pickup_date DATE NOT NULL,
  pickup_time VARCHAR(10),
  delivery_date DATE,

  -- Service
  service_type VARCHAR(50),

  -- Additional services (booleans)
  insurance BOOLEAN DEFAULT FALSE,
  packaging BOOLEAN DEFAULT FALSE,
  loading BOOLEAN DEFAULT FALSE,
  storage BOOLEAN DEFAULT FALSE,

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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX idx_bookings_idempotency_key ON bookings(idempotency_key);

-- Enable Row Level Security (RLS) but allow all operations for anon key
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations (for prototype - in production you'd restrict this)
CREATE POLICY "Allow all operations" ON bookings
  FOR ALL
  USING (true)
  WITH CHECK (true);
