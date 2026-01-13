export function generateBookingId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `TRE-${date}-${seq}`;
}

export function generateConfirmationNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CONF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function estimateCost(weight?: string): number {
  const weightNum = parseFloat(weight || '1000') || 1000;
  const baseRate = 0.15;
  const baseCost = weightNum * baseRate;
  return Math.round(Math.max(baseCost, 100) * 100) / 100;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Request-Id, X-Idempotency-Key, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export function errorResponse(error: string, code: string, status = 400, details?: Record<string, string>) {
  return jsonResponse({ error, code, ...(details && { details }) }, status);
}
