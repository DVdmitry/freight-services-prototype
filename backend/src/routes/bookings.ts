import { Router, Request, Response } from 'express';
import {
  createBooking,
  getBookingById,
  getAllBookings,
  validateBookingRequest,
  BookingRequest,
} from '../services/booking.service';

const router = Router();

// POST /api/bookings - Create new booking
router.post('/', (req: Request, res: Response) => {
  const data: Partial<BookingRequest> = req.body;

  // Validate request
  const validationError = validateBookingRequest(data);
  if (validationError) {
    res.status(400).json(validationError);
    return;
  }

  const idempotencyKey = req.headers['x-idempotency-key'] as string | undefined;
  const requestId = req.headers['x-request-id'] as string | undefined;

  try {
    const booking = createBooking(
      data as BookingRequest,
      idempotencyKey,
      requestId
    );
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'SERVER_ERROR',
    });
  }
});

// GET /api/bookings - List all bookings
router.get('/', (_req: Request, res: Response) => {
  try {
    const result = getAllBookings();
    res.json(result);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'SERVER_ERROR',
    });
  }
});

// GET /api/bookings/:id - Get single booking
router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const booking = getBookingById(id);
    if (!booking) {
      res.status(404).json({
        error: 'Booking not found',
        code: 'NOT_FOUND',
      });
      return;
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'SERVER_ERROR',
    });
  }
});

export default router;
