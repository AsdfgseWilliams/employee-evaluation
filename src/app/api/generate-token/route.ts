import { generateToken } from '@/utils/generateToken';

export async function GET() {
  // Aquí se genera un token único para el evaluador actual
  const token = generateToken('evaluador'); // O alguna lógica para identificar al evaluador
  return new Response(JSON.stringify({ token }), { status: 200 });
}
