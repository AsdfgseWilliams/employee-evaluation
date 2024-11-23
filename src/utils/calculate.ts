export function calculateWeightedAverages(
  responses: { question: string; answer: number }[],
  interactionLevel: number // Nivel de interacción del evaluado
) {
  const weightedAverages: Record<string, number> = {};

  responses.forEach((response) => {
    if (!isNaN(response.answer)) {
      // Multiplicar la respuesta por el nivel de interacción del evaluado
      const weightedAnswer = response.answer * interactionLevel;

      if (!weightedAverages[response.question]) {
        weightedAverages[response.question] = 0;
      }

      weightedAverages[response.question] += weightedAnswer;
    }
  });

  const averages: Record<string, number> = {};
  for (const question in weightedAverages) {
    const totalResponses = responses.filter((response) => response.question === question).length;
    averages[question] = weightedAverages[question] / totalResponses;
  }

  return averages;
}
