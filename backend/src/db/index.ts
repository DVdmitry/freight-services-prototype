import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH || './data/bookings.db';

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Initialize schema
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

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
  updated_at: string;
}

export interface CreateBookingData {
  bookingId: string;
  confirmationNumber: string;
  cargoType?: string;
  weight?: string;
  dimensions?: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  specialInstructions?: string;
  estimatedCost: number;
  idempotencyKey?: string;
  requestId?: string;
}

export function findByIdempotencyKey(key: string): BookingRow | undefined {
  const stmt = db.prepare('SELECT * FROM bookings WHERE idempotency_key = ?');
  return stmt.get(key) as BookingRow | undefined;
}

export function findByBookingId(bookingId: string): BookingRow | undefined {
  const stmt = db.prepare('SELECT * FROM bookings WHERE booking_id = ?');
  return stmt.get(bookingId) as BookingRow | undefined;
}

export function findAllBookings(): BookingRow[] {
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC');
  return stmt.all() as BookingRow[];
}

export function createBooking(data: CreateBookingData): BookingRow {
  const stmt = db.prepare(`
    INSERT INTO bookings (
      booking_id, confirmation_number, cargo_type, weight, dimensions,
      pickup_address, delivery_address, pickup_date, delivery_date,
      contact_name, contact_phone, contact_email, special_instructions,
      estimated_cost, idempotency_key, request_id
    ) VALUES (
      @bookingId, @confirmationNumber, @cargoType, @weight, @dimensions,
      @pickupAddress, @deliveryAddress, @pickupDate, @deliveryDate,
      @contactName, @contactPhone, @contactEmail, @specialInstructions,
      @estimatedCost, @idempotencyKey, @requestId
    )
  `);

  stmt.run({
    bookingId: data.bookingId,
    confirmationNumber: data.confirmationNumber,
    cargoType: data.cargoType || null,
    weight: data.weight || null,
    dimensions: data.dimensions || null,
    pickupAddress: data.pickupAddress,
    deliveryAddress: data.deliveryAddress,
    pickupDate: data.pickupDate,
    deliveryDate: data.deliveryDate || null,
    contactName: data.contactName || null,
    contactPhone: data.contactPhone || null,
    contactEmail: data.contactEmail || null,
    specialInstructions: data.specialInstructions || null,
    estimatedCost: data.estimatedCost,
    idempotencyKey: data.idempotencyKey || null,
    requestId: data.requestId || null,
  });

  return findByBookingId(data.bookingId)!;
}

export default db;
