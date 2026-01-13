import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface BookingRow {
  id: number;
  booking_id: string;
  confirmation_number: string;
  cargo_type: string | null;
  weight: string | null;
  dimensions: string | null;
  pickup_address: string;
  delivery_address: string;
  pickup_date: string;
  delivery_date: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  special_instructions: string | null;
  status: string;
  estimated_cost: number | null;
  currency: string;
  idempotency_key: string | null;
  request_id: string | null;
  created_at: string;
}
