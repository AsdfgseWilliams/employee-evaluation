// save-evaluations.js
import { db } from '@/utils/firebase';  // Asegúrate de que la importación sea correcta
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

// Esta función guarda una evaluación en Firestore
export async function saveEvaluation({ evaluadoName, token, question, answer }) {
  try {
    // Mostrar los datos antes de enviarlos para comprobar que son correctos
    console.log('Guardando la evaluación con los siguientes datos:', {
      evaluadoName,
      token,
      question,
      answer
    });

    // Agrega un documento a la colección "evaluaciones"
    const docRef = await addDoc(collection(db, 'evaluaciones'), {
      evaluadoName,       // Nombre del evaluado
      token,              // Token del evaluado
      question,           // Pregunta de la evaluación
      answer,             // Respuesta a la pregunta
    });

    // Si la evaluación se guarda correctamente, loguea el ID del documento
    console.log("Documento guardado con ID:", docRef.id);

    // Ahora obtenemos el documento guardado
    const savedDoc = await getDoc(doc(db, 'evaluaciones', docRef.id));  // Aquí se obtiene el documento por su ID
    if (savedDoc.exists()) {
      console.log("Documento guardado en Firestore:", savedDoc.data());
    } else {
      console.log("El documento no existe.");
    }

  } catch (error) {
    // Si hay un error, loguea el error
    console.error('Error al guardar la evaluación:', error);
    throw new Error('Error al guardar la evaluación');
  }
}
