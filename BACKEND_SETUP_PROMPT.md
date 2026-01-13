# Prompt for AI Agent: TransEdge Freight Proto Backend Setup

## Context

You are tasked with creating a backend API for the **TransEdge Freight Proto** project. This is a freight booking prototype that currently exists as a frontend-only React application. The backend will receive booking requests from an external AI-powered booking widget called **Typelessity**.

### What is Typelessity?

Typelessity is a universal AI booking widget that:
- Collects booking data through natural conversation
- Extracts structured data using GPT
- Sends the final booking to a client's API endpoint via POST request
- Expects a JSON response with booking confirmation

### Current TransEdge State

- **Location**: This project folder
- **Tech Stack**: React 19, TypeScript 5.8, Vite, Tailwind CSS
- **Current State**: Frontend-only, all data is mocked
- **No Backend**: There is NO existing backend or database

---

## Your Task

Create a simple but functional backend API for TransEdge that can:

1. **Receive booking requests** from Typelessity widget
2. **Store bookings** in a database
3. **Return confirmation** with booking ID
4. **Provide GET endpoints** to view bookings
5. **Be hosted publicly** (accessible via HTTPS URL)

---

## Technical Requirements

### 1. Technology Stack (Recommended)

Choose ONE of these approaches:

**Option A: Node.js + Express + SQLite (Simplest)**
- Express.js for API
- SQLite for database (file-based, no setup needed)
- Deploy to Railway.app or Render.com (free tier)

**Option B: Node.js + Express + PostgreSQL**
- Express.js for API
- PostgreSQL (use Supabase free tier or Railway)
- Deploy to Railway.app or Render.com

**Option C: Serverless (Vercel/Netlify Functions)**
- Vercel Serverless Functions
- Use Vercel KV or Supabase for storage

### 2. API Endpoints Required

#### POST /api/bookings
Receive new booking from Typelessity.

**Request from Typelessity:**
```http
POST /api/bookings HTTP/1.1
Content-Type: application/json
X-Request-Id: req_abc123
X-Idempotency-Key: idem_xyz789

{
  "cargoType": "General Freight",
  "weight": "5000",
  "dimensions": "120x100x150",
  "pickupAddress": "123 Industrial Way, Chicago, IL 60601",
  "deliveryAddress": "456 Commerce St, Detroit, MI 48201",
  "pickupDate": "2026-01-15",
  "deliveryDate": "2026-01-17",
  "contactName": "John Smith",
  "contactPhone": "+1-312-555-0100",
  "contactEmail": "john@example.com",
  "specialInstructions": "Fragile cargo, handle with care"
}
```

**Expected Response (Success):**
```json
{
  "bookingId": "TRE-20260115-001",
  "confirmationNumber": "CONF-ABC123",
  "status": "confirmed",
  "message": "Booking received successfully",
  "estimatedCost": 1250.00,
  "currency": "USD"
}
```

**Expected Response (Error):**
```json
{
  "error": "Invalid pickup date",
  "code": "VALIDATION_ERROR"
}
```

#### GET /api/bookings
List all bookings (for admin view).

**Response:**
```json
{
  "bookings": [
    {
      "bookingId": "TRE-20260115-001",
      "cargoType": "General Freight",
      "pickupAddress": "123 Industrial Way, Chicago, IL 60601",
      "deliveryAddress": "456 Commerce St, Detroit, MI 48201",
      "pickupDate": "2026-01-15",
      "status": "confirmed",
      "createdAt": "2026-01-12T10:30:00Z"
    }
  ],
  "total": 1
}
```

#### GET /api/bookings/:id
Get single booking details.

**Response:**
```json
{
  "bookingId": "TRE-20260115-001",
  "confirmationNumber": "CONF-ABC123",
  "cargoType": "General Freight",
  "weight": "5000",
  "dimensions": "120x100x150",
  "pickupAddress": "123 Industrial Way, Chicago, IL 60601",
  "deliveryAddress": "456 Commerce St, Detroit, MI 48201",
  "pickupDate": "2026-01-15",
  "deliveryDate": "2026-01-17",
  "contactName": "John Smith",
  "contactPhone": "+1-312-555-0100",
  "contactEmail": "john@example.com",
  "specialInstructions": "Fragile cargo, handle with care",
  "status": "confirmed",
  "estimatedCost": 1250.00,
  "currency": "USD",
  "createdAt": "2026-01-12T10:30:00Z"
}
```

#### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T10:30:00Z",
  "version": "1.0.0"
}
```

### 3. Database Schema

```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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

CREATE INDEX idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX idx_bookings_idempotency_key ON bookings(idempotency_key);
```

### 4. CORS Configuration

The API MUST allow cross-origin requests from Typelessity widget:

```javascript
// Express CORS setup
app.use(cors({
  origin: '*', // Or specific origins: ['https://typelessity.com', 'http://localhost:3000']
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Request-Id', 'X-Idempotency-Key', 'Authorization'],
}));
```

### 5. Idempotency Support

Typelessity sends `X-Idempotency-Key` header to prevent duplicate bookings on retry. Implement idempotency:

```javascript
async function createBooking(req, res) {
  const idempotencyKey = req.headers['x-idempotency-key'];

  // Check if booking with this key already exists
  if (idempotencyKey) {
    const existing = await db.findByIdempotencyKey(idempotencyKey);
    if (existing) {
      return res.json(existing); // Return existing booking
    }
  }

  // Create new booking
  const booking = await db.createBooking({
    ...req.body,
    idempotencyKey,
    requestId: req.headers['x-request-id'],
  });

  return res.status(201).json(booking);
}
```

### 6. Booking ID Generation

Generate human-readable booking IDs:

```javascript
function generateBookingId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `TRE-${date}-${seq}`;
}

function generateConfirmationNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CONF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### 7. Cost Estimation (Simple)

Add simple cost calculation:

```javascript
function estimateCost(weight, pickupAddress, deliveryAddress) {
  // Simple estimation based on weight
  const weightNum = parseFloat(weight) || 1000;
  const baseRate = 0.15; // $0.15 per lb
  const baseCost = weightNum * baseRate;

  // Add minimum charge
  return Math.max(baseCost, 100);
}
```

---

## Deployment Instructions

### Option A: Railway.app (Recommended)

1. Create account at https://railway.app
2. Connect GitHub repository
3. Railway auto-detects Node.js
4. Set environment variables if needed
5. Deploy - Railway provides HTTPS URL automatically

### Option B: Render.com

1. Create account at https://render.com
2. Create new "Web Service"
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy - Render provides HTTPS URL

### Option C: Vercel (Serverless)

1. Create account at https://vercel.com
2. Import repository
3. Create `/api` folder with serverless functions
4. Deploy - Vercel provides HTTPS URL

---

## Project Structure (Recommended)

```
transedge-freight-proto/
├── backend/                    # NEW: Backend folder
│   ├── src/
│   │   ├── index.ts           # Express app entry
│   │   ├── routes/
│   │   │   ├── bookings.ts    # Booking endpoints
│   │   │   └── health.ts      # Health check
│   │   ├── db/
│   │   │   ├── index.ts       # Database connection
│   │   │   └── schema.sql     # Database schema
│   │   ├── services/
│   │   │   └── booking.service.ts
│   │   └── utils/
│   │       └── id-generator.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── src/                        # Existing frontend
├── public/
└── package.json
```

---

## Validation Requirements

Validate incoming booking data:

```typescript
interface BookingRequest {
  cargoType?: string;           // Optional
  weight?: string;              // Optional, e.g., "5000" or "5000 lbs"
  dimensions?: string;          // Optional, e.g., "120x100x150"
  pickupAddress: string;        // REQUIRED
  deliveryAddress: string;      // REQUIRED
  pickupDate: string;           // REQUIRED, ISO date
  deliveryDate?: string;        // Optional, ISO date
  contactName?: string;         // Optional
  contactPhone?: string;        // Optional
  contactEmail?: string;        // Optional
  specialInstructions?: string; // Optional
}
```

Return 400 Bad Request if required fields are missing:

```json
{
  "error": "Missing required field: pickupAddress",
  "code": "VALIDATION_ERROR",
  "details": {
    "field": "pickupAddress",
    "message": "Pickup address is required"
  }
}
```

---

## Testing the Integration

After deployment, test with curl:

```bash
# Health check
curl https://your-api-url.com/api/health

# Create booking
curl -X POST https://your-api-url.com/api/bookings \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: test-123" \
  -d '{
    "cargoType": "General Freight",
    "weight": "5000",
    "pickupAddress": "123 Industrial Way, Chicago, IL 60601",
    "deliveryAddress": "456 Commerce St, Detroit, MI 48201",
    "pickupDate": "2026-01-15"
  }'

# Get all bookings
curl https://your-api-url.com/api/bookings

# Get single booking
curl https://your-api-url.com/api/bookings/TRE-20260115-001
```

---

## Success Criteria

Your implementation is complete when:

1. [ ] Backend is deployed and accessible via HTTPS URL
2. [ ] POST /api/bookings accepts and stores bookings
3. [ ] POST returns proper JSON with bookingId and confirmationNumber
4. [ ] GET /api/bookings lists all bookings
5. [ ] GET /api/bookings/:id returns single booking
6. [ ] GET /api/health returns status
7. [ ] CORS is configured (allows cross-origin requests)
8. [ ] Idempotency is implemented (duplicate requests return same response)
9. [ ] Validation returns proper error messages

---

## Final Deliverable

After completing the backend, provide:

1. **API URL**: The public HTTPS URL of the deployed API
2. **Endpoint Summary**: List of all endpoints with examples
3. **Test Results**: Screenshots or curl output showing working endpoints

This URL will then be configured in Typelessity as the integration endpoint for TransEdge Freight bookings.

---

## Questions?

If anything is unclear:
- The booking data structure comes from TransEdge's existing `OrderData` interface
- Typelessity will map its extracted fields to your API's expected format
- Focus on simplicity - this is a prototype, not production system
- Choose the simplest deployment option that works
