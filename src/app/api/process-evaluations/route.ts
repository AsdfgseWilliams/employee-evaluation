import database from '@/utils/database'; 
import { calculateWeightedAverages } from '@/utils/calculate'; // Ajusta la ruta si es necesario

// Usa la interfaz renombrada `DatabaseResponseItem` para las respuestas de la base de datos
import { DatabaseResponseItem } from '@/utils/database';

export async function GET() {
  try {
    // Obtener todas las respuestas y transformarlas
    const responses: DatabaseResponseItem[] = (await database.getAllResponses()).map((response: DatabaseResponseItem) => ({
      token: response.token,
      question: response.question,
      answer: response.answer,
      timestamp: response.timestamp,
    }));

    // Filtrar solo las respuestas de tipo `number` y asegurarse de que `answer` sea siempre un número
    const numericResponses = responses.filter(response => typeof response.answer === 'number');

    // Crear el array de objetos con las respuestas numéricas
    const responsesToProcess = numericResponses.map(response => ({
      question: response.question,
      answer: response.answer as number, // Aseguramos que el tipo de `answer` es número
    }));

    // Aquí debes obtener o calcular el valor de `interactionLevel`, por ejemplo:
    const interactionLevel = 5; // Este valor debe ser calculado según tu lógica

    // Calcular promedios ponderados solo con las respuestas numéricas
    const processedResults = calculateWeightedAverages(responsesToProcess, interactionLevel);

    return new Response(JSON.stringify({ results: processedResults }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al procesar las evaluaciones' }), { status: 500 });
  }
}
