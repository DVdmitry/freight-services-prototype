import {
  findByIdempotencyKey,
  findByBookingId,
  findAllBookings,
  createBooking as dbCreateBooking,
  BookingRow,
} from '../db';
import {
  generateBookingId,
  generateConfirmationNumber,
  estimateCost,
} from '../utils/id-generator';

export interface BookingRequest {
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
}

export interface BookingResponse {
  bookingId: string;
  confirmationNumber: string;
  status: string;
  message: string;
  estimatedCost: number;
  currency: string;
}

export interface BookingDetails {
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
  status: string;
  estimatedCost: number;
  currency: string;
  createdAt: string;
}

export interface BookingListItem {
  bookingId: string;
  cargoType?: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  status: string;
  createdAt: string;
}

export interface ValidationError {
  error: string;
  code: string;
  details: {
    field: string;
    message: string;
  };
}

function rowToDetails(row: BookingRow): BookingDetails {
  return {
    bookingId: row.booking_id,
    confirmationNumber: row.confirmation_number,
    cargoType: row.cargo_type || undefined,
    weight: row.weight || undefined,
    dimensions: row.dimensions || undefined,
    pickupAddress: row.pickup_address,
    deliveryAddress: row.delivery_address,
    pickupDate: row.pickup_date,
    deliveryDate: row.delivery_date || undefined,
    contactName: row.contact_name || undefined,
    contactPhone: row.contact_phone || undefined,
    contactEmail: row.contact_email || undefined,
    specialInstructions: row.special_instructions || undefined,
    status: row.status,
    estimatedCost: row.estimated_cost || 0,
    currency: row.currency,
    createdAt: row.created_at,
  };
}

function rowToListItem(row: BookingRow): BookingListItem {
  return {
    bookingId: row.booking_id,
    cargoType: row.cargo_type || undefined,
    pickupAddress: row.pickup_address,
    deliveryAddress: row.delivery_address,
    pickupDate: row.pickup_date,
    status: row.status,
    createdAt: row.created_at,
  };
}

function rowToResponse(row: BookingRow): BookingResponse {
  return {
    bookingId: row.booking_id,
    confirmationNumber: row.confirmation_number,
    status: row.status,
    message: 'Booking received successfully',
    estimatedCost: row.estimated_cost || 0,
    currency: row.currency,
  };
}

export function validateBookingRequest(
  data: Partial<BookingRequest>
): ValidationError | null {
  if (!data.pickupAddress || data.pickupAddress.trim() === '') {
    return {
      error: 'Missing required field: pickupAddress',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'pickupAddress',
        message: 'Pickup address is required',
      },
    };
  }

  if (!data.deliveryAddress || data.deliveryAddress.trim() === '') {
    return {
      error: 'Missing required field: deliveryAddress',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'deliveryAddress',
        message: 'Delivery address is required',
      },
    };
  }

  if (!data.pickupDate || data.pickupDate.trim() === '') {
    return {
      error: 'Missing required field: pickupDate',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'pickupDate',
        message: 'Pickup date is required',
      },
    };
  }

  // Validate date format (ISO date)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.pickupDate)) {
    return {
      error: 'Invalid pickup date format',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'pickupDate',
        message: 'Pickup date must be in ISO format (YYYY-MM-DD)',
      },
    };
  }

  if (data.deliveryDate && !dateRegex.test(data.deliveryDate)) {
    return {
      error: 'Invalid delivery date format',
      code: 'VALIDATION_ERROR',
      details: {
        field: 'deliveryDate',
        message: 'Delivery date must be in ISO format (YYYY-MM-DD)',
      },
    };
  }

  return null;
}

export function createBooking(
  data: BookingRequest,
  idempotencyKey?: string,
  requestId?: string
): BookingResponse {
  // Check for existing booking with same idempotency key
  if (idempotencyKey) {
    const existing = findByIdempotencyKey(idempotencyKey);
    if (existing) {
      return rowToResponse(existing);
    }
  }

  const bookingId = generateBookingId();
  const confirmationNumber = generateConfirmationNumber();
  const cost = estimateCost(data.weight);

  const row = dbCreateBooking({
    bookingId,
    confirmationNumber,
    cargoType: data.cargoType,
    weight: data.weight,
    dimensions: data.dimensions,
    pickupAddress: data.pickupAddress,
    deliveryAddress: data.deliveryAddress,
    pickupDate: data.pickupDate,
    deliveryDate: data.deliveryDate,
    contactName: data.contactName,
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    specialInstructions: data.specialInstructions,
    estimatedCost: cost,
    idempotencyKey,
    requestId,
  });

  return rowToResponse(row);
}

export function getBookingById(
  bookingId: string
): BookingDetails | null {
  const row = findByBookingId(bookingId);
  if (!row) return null;
  return rowToDetails(row);
}

export function getAllBookings(): {
  bookings: BookingListItem[];
  total: number;
} {
  const rows = findAllBookings();
  return {
    bookings: rows.map(rowToListItem),
    total: rows.length,
  };
}
