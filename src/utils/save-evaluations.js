import { db } from '@/utils/firebase';  // Asegúrate de que la importación sea correcta
import { collection, addDoc } from 'firebase/firestore';

// Esta función guarda una evaluación en la colección específica del evaluado
export async function saveEvaluation({ evaluadoName, token, question, answer }) {
  try {
    console.log('Guardando la evaluación con los siguientes datos:', {
      evaluadoName,
      token,
      question,
      answer
    });

    // Accede a la subcolección específica del evaluado
    const evaluadoCollection = collection(db, 'evaluaciones', evaluadoName, 'respuestas');

    // Agrega la evaluación como un documento dentro de la subcolección del evaluado
    const docRef = await addDoc(evaluadoCollection, {
      token,              // Token del evaluado
      question,           // Pregunta de la evaluación
      answer,             // Respuesta a la pregunta
    });

    console.log("Documento guardado con ID:", docRef.id);
  } catch (error) {
    console.error('Error al guardar la evaluación:', error);
    throw new Error('Error al guardar la evaluación');
  }
}
