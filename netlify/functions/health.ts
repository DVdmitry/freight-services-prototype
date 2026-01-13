import { corsHeaders, jsonResponse } from './lib/utils';

export default async (request: Request) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
};
