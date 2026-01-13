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
  // Simple estimation based on weight
  const weightNum = parseFloat(weight || '1000') || 1000;
  const baseRate = 0.15; // $0.15 per lb
  const baseCost = weightNum * baseRate;

  // Add minimum charge and round to 2 decimal places
  return Math.round(Math.max(baseCost, 100) * 100) / 100;
}
