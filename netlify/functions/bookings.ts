import type { Context } from '@netlify/functions';
import { supabase, BookingRow } from './lib/supabase';
import {
  generateBookingId,
  generateConfirmationNumber,
  estimateCost,
  corsHeaders,
  jsonResponse,
  errorResponse,
} from './lib/utils';

interface BookingRequest {
  cargoType?: string;
  weight?: string | number;
  dimensions?: string;
  // Support separate dimension fields from Typelessity
  length?: number;
  width?: number;
  height?: number;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTime?: string;
  deliveryDate?: string;
  serviceType?: string;
  insurance?: boolean;
  packaging?: boolean;
  loading?: boolean;
  storage?: boolean;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  specialInstructions?: string;
}

function validateBooking(data: Partial<BookingRequest>) {
  if (!data.pickupAddress?.trim()) {
    return { field: 'pickupAddress', message: 'Pickup address is required' };
  }
  if (!data.deliveryAddress?.trim()) {
    return { field: 'deliveryAddress', message: 'Delivery address is required' };
  }
  if (!data.pickupDate?.trim()) {
    return { field: 'pickupDate', message: 'Pickup date is required' };
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.pickupDate)) {
    return { field: 'pickupDate', message: 'Pickup date must be in ISO format (YYYY-MM-DD)' };
  }
  if (data.deliveryDate && !dateRegex.test(data.deliveryDate)) {
    return { field: 'deliveryDate', message: 'Delivery date must be in ISO format (YYYY-MM-DD)' };
  }
  return null;
}

function rowToResponse(row: BookingRow) {
  return {
    bookingId: row.booking_id,
    confirmationNumber: row.confirmation_number,
    status: row.status,
    message: 'Booking received successfully',
    estimatedCost: row.estimated_cost || 0,
    currency: row.currency,
  };
}

function rowToDetails(row: BookingRow) {
  return {
    bookingId: row.booking_id,
    confirmationNumber: row.confirmation_number,
    cargoType: row.cargo_type,
    weight: row.weight,
    dimensions: row.dimensions,
    pickupAddress: row.pickup_address,
    deliveryAddress: row.delivery_address,
    pickupDate: row.pickup_date,
    pickupTime: row.pickup_time,
    deliveryDate: row.delivery_date,
    serviceType: row.service_type,
    insurance: row.insurance,
    packaging: row.packaging,
    loading: row.loading,
    storage: row.storage,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    specialInstructions: row.special_instructions,
    status: row.status,
    estimatedCost: row.estimated_cost,
    currency: row.currency,
    createdAt: row.created_at,
  };
}

function rowToListItem(row: BookingRow) {
  return {
    bookingId: row.booking_id,
    cargoType: row.cargo_type,
    weight: row.weight,
    dimensions: row.dimensions,
    pickupAddress: row.pickup_address,
    deliveryAddress: row.delivery_address,
    pickupDate: row.pickup_date,
    pickupTime: row.pickup_time,
    deliveryDate: row.delivery_date,
    serviceType: row.service_type,
    insurance: row.insurance,
    packaging: row.packaging,
    loading: row.loading,
    storage: row.storage,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email,
    specialInstructions: row.special_instructions,
    status: row.status,
    createdAt: row.created_at,
  };
}

async function handlePost(request: Request) {
  const idempotencyKey = request.headers.get('x-idempotency-key');
  const requestId = request.headers.get('x-request-id');

  // Check idempotency
  if (idempotencyKey) {
    const { data: existing } = await supabase
      .from('bookings')
      .select('*')
      .eq('idempotency_key', idempotencyKey)
      .single();

    if (existing) {
      return jsonResponse(rowToResponse(existing as BookingRow));
    }
  }

  const body: Partial<BookingRequest> = await request.json();

  // Validate
  const validationError = validateBooking(body);
  if (validationError) {
    return errorResponse(
      `Missing required field: ${validationError.field}`,
      'VALIDATION_ERROR',
      400,
      validationError
    );
  }

  const bookingId = generateBookingId();
  const confirmationNumber = generateConfirmationNumber();
  // Convert weight to string if number
  const weightStr = body.weight != null ? String(body.weight) : null;
  const cost = estimateCost(weightStr);

  // Combine separate dimension fields into "LxWxH" format if dimensions not provided
  let dimensions = body.dimensions || null;
  if (!dimensions && body.length && body.width && body.height) {
    dimensions = `${body.length}x${body.width}x${body.height}`;
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      booking_id: bookingId,
      confirmation_number: confirmationNumber,
      cargo_type: body.cargoType || null,
      weight: weightStr,
      dimensions,
      pickup_address: body.pickupAddress,
      delivery_address: body.deliveryAddress,
      pickup_date: body.pickupDate,
      pickup_time: body.pickupTime || null,
      delivery_date: body.deliveryDate || null,
      service_type: body.serviceType || null,
      insurance: body.insurance ?? false,
      packaging: body.packaging ?? false,
      loading: body.loading ?? false,
      storage: body.storage ?? false,
      contact_name: body.contactName || null,
      contact_phone: body.contactPhone || null,
      contact_email: body.contactEmail || null,
      special_instructions: body.specialInstructions || null,
      estimated_cost: cost,
      idempotency_key: idempotencyKey || null,
      request_id: requestId || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500);
  }

  return jsonResponse(rowToResponse(data as BookingRow), 201);
}

async function cleanupOldBookings() {
  // Delete bookings older than 2 days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  await supabase
    .from('bookings')
    .delete()
    .lt('created_at', twoDaysAgo.toISOString());
}

async function handleGetAll() {
  // Cleanup old bookings (older than 2 days)
  await cleanupOldBookings();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500);
  }

  const bookings = (data as BookingRow[]).map(rowToListItem);
  return jsonResponse({ bookings, total: bookings.length });
}

async function handleGetOne(bookingId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_id', bookingId)
    .single();

  if (error || !data) {
    return errorResponse('Booking not found', 'NOT_FOUND', 404);
  }

  return jsonResponse(rowToDetails(data as BookingRow));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (request: Request, _context: Context) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  // Path: /api/bookings or /api/bookings/:id
  const bookingId = pathParts.length > 2 ? pathParts[2] : null;

  try {
    if (request.method === 'POST') {
      return await handlePost(request);
    }

    if (request.method === 'GET') {
      if (bookingId) {
        return await handleGetOne(bookingId);
      }
      return await handleGetAll();
    }

    return errorResponse('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
  } catch (err) {
    console.error('Function error:', err);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500);
  }
};
