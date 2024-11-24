import { generateToken } from '@/utils/generateToken';

export async function GET() {
  const token = generateToken(); // O alguna lógica para identificar al evaluador
  return new Response(JSON.stringify({ token }), { status: 200 });
}
