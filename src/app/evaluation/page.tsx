'use client';

import { useState, useEffect } from 'react';
import Question from '@/components/Question';
import { evaluadosTokens } from '@/utils/generateToken';
import { saveEvaluation } from '@/utils/save-evaluations';

// Tipo de respuesta almacenada
interface Answer {
  question: string;
  answer: string | number;
}

export default function EvaluationPage() {
  const [token, setToken] = useState<string | null>(null);
  const [currentEvaluadoIndex, setCurrentEvaluadoIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [interactionLevel, setInteractionLevel] = useState<number | null>(null);
  // Cargar el token correspondiente al evaluado actual
  useEffect(() => {
    const evaluado = evaluadosTokens[currentEvaluadoIndex];
    setToken(evaluado.token);
  }, [currentEvaluadoIndex]);

  if (!token) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // Definición de preguntas
  const questions: { question: string; type: 'numeric' | 'text'; options: number[] | string[] }[] = [
    { question: "Trabajo en equipo y colaboración", type: "numeric", options: Array.from({ length: 10 }, (_, i) => i + 1) },
    { question: "Responsabilidad", type: "numeric", options: Array.from({ length: 10 }, (_, i) => i + 1) },
    { question: "Innovación y nuevos skills", type: "numeric", options: Array.from({ length: 10 }, (_, i) => i + 1) },
    { question: "Gestión del tiempo y productividad", type: "numeric", options: Array.from({ length: 10 }, (_, i) => i + 1) },
    { question: "Autonomía", type: "numeric", options: Array.from({ length: 10 }, (_, i) => i + 1) },
    { question: "Cosas a mejorar", type: "text", options: [] },
    { question: "Cosas que hace bien", type: "text", options: [] },
  ];

  // Manejar la respuesta de una pregunta
  const handleAnswer = (question: string, answer: string | number, type: 'numeric' | 'text') => {
    const formattedAnswer: string | number = type === 'numeric' ? Number(answer) : answer;

    if (question === "Nivel de interacción con la persona" && type === 'numeric') {
      setInteractionLevel(formattedAnswer as number);
    }

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.question === question);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { question, answer: formattedAnswer };
        return updatedAnswers;
      }
      return [...prevAnswers, { question, answer: formattedAnswer }];
    });
  };

  // Enviar las respuestas al backend
  const submitAnswers = async () => {
    if (interactionLevel === 1) {
      goToNextEvaluado();
      return;
    }

    const unansweredQuestions = questions.filter((q) => !answers.some((a) => a.question === q.question));
    if (unansweredQuestions.length > 0) {
      setError("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }

    setError(null);
    const currentEvaluado = evaluadosTokens[currentEvaluadoIndex];

    await Promise.all(
      answers.map(({ question, answer }) =>
        saveEvaluation({
          evaluadoName: currentEvaluado.name,
          token,
          question,
          answer,
        })
      )
    );

    alert("Respuestas enviadas correctamente.");
    goToNextEvaluado();
  };

  // Avanzar al siguiente evaluado
  const goToNextEvaluado = () => {
    if (currentEvaluadoIndex < evaluadosTokens.length - 1) {
      setCurrentEvaluadoIndex(currentEvaluadoIndex + 1);
      setInteractionLevel(null);
      setAnswers([]);
      setError(null);
    } else {
      alert("Has completado todas las evaluaciones.");
    }
  };
  

  return (
    <div className="min-h-screen mx-auto p-8 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg rounded-lg text-white">
      <h1 className="text-4xl font-extrabold text-center mb-6">Evaluación Anónima</h1>
      <p className="text-lg text-center mb-6">
        Por favor, responde a las siguientes preguntas sobre <strong>{evaluadosTokens[currentEvaluadoIndex]?.name}</strong>.
      </p>

      {interactionLevel === null ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <Question
            question={`¿Cuánta interacción tienes con ${evaluadosTokens[currentEvaluadoIndex]?.name}?`}
            options={Array.from({ length: 10 }, (_, i) => i + 1) as number[]}
            type="numeric"
            onAnswer={(answer) => handleAnswer("Nivel de interacción con la persona", answer, 'numeric')}
          />
        </div>
      ) : interactionLevel === 1 ? (
        <div className="text-center">
          <p>Interacción mínima detectada. Pasando al siguiente compañero...</p>
          <button
            className="bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-500 transition duration-300 transform hover:scale-105 mt-8"
            onClick={goToNextEvaluado}
          >
            Evaluar siguiente compañero
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-black">
              <Question
                question={q.question}
                options={q.options as number[] | string[]}
                type={q.type}
                onAnswer={(answer) => handleAnswer(q.question, answer, q.type)}
              />
            </div>
          ))}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          <button
            className="bg-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-pink-500 transition duration-300 transform hover:scale-105 mt-8"
            onClick={submitAnswers}
          >
            Enviar respuestas
          </button>
        </div>
      )}    
    </div>
  );
}
