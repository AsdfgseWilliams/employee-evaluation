import { db } from '@/utils/firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

export interface DatabaseResponseItem {
  token: string;
  question: string;
  answer: string | number;
  timestamp?: string;
}

const database = {
  saveResponse: async ({ token, question, answer }: DatabaseResponseItem): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, 'evaluaciones'), {
        token,
        question,
        answer: String(answer),
        timestamp: serverTimestamp(), // Tiempos manejados por Firebase
      });
      console.log('Respuesta guardada con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar la respuesta en la base de datos:', error);
      throw new Error('Error al guardar la respuesta');
    }
  },

  getAllResponses: async (): Promise<DatabaseResponseItem[]> => {
    try {
      const snapshot = await getDocs(collection(db, 'evaluaciones'));
      const responses: DatabaseResponseItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          token: data.token,
          question: data.question,
          answer: data.answer,
          timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : undefined,
        };
      });
      return responses;
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
      throw new Error('Error al obtener las respuestas');
    }
  }
};

export default database;
