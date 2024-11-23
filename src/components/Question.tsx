'use client';
import { useState } from 'react';

interface QuestionProps {
  question: string;
  options: number[] | []; // Las opciones solo son relevantes para preguntas numéricas
  type: 'numeric' | 'text';
  onAnswer: (answer: string | number) => void;
}

const Question = ({ question, options, type, onAnswer }: QuestionProps) => {
  const [answer, setAnswer] = useState<string | number | null>(null);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = type === 'numeric' ? Number(e.target.value) || 0 : e.target.value;
    setAnswer(value);
    onAnswer(value);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      {type === 'numeric' ? (
        <select
          className="w-full p-2 border rounded-md"
          value={answer ?? ''}
          onChange={handleAnswerChange}
        >
          <option value="">Selecciona una opción</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          className="w-full p-2 border rounded-md"
          value={(answer ?? '') as string}
          onChange={handleAnswerChange}
          placeholder="Escribe tu respuesta"
          rows={4}
        />
      )}
    </div>
  );
};

export default Question;
