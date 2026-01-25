-- Migration 001: Add service and additional options fields
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- Only run ONCE on existing database

-- Add new columns
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS pickup_time VARCHAR(10),
ADD COLUMN IF NOT EXISTS service_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS insurance BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS packaging BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS loading BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS storage BOOLEAN DEFAULT FALSE;

-- Verify columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;
