import express from 'express';
import cors from 'cors';
import bookingsRouter from './routes/bookings';
import healthRouter from './routes/health';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow cross-origin requests
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'X-Request-Id',
      'X-Idempotency-Key',
      'Authorization',
    ],
  })
);

// Parse JSON bodies
app.use(express.json());

// Request logging
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/health', healthRouter);
app.use('/api/bookings', bookingsRouter);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'TransEdge Freight API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      bookings: '/api/bookings',
    },
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not found',
    code: 'NOT_FOUND',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TransEdge Freight API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Bookings API: http://localhost:${PORT}/api/bookings`);
});
