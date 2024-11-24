import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Función para generar un token único
export const generateToken = (): string => {
  return Math.random().toString(36).substr(2, 9); // Token aleatorio de 9 caracteres
};

// Lista de evaluados
export const evaluados = [
  "Borja Planells", "Edu Vivar", "Albert Puig", "Alba Barros", "Sete Flores", 
  "Ximena Xavier", "Cynthia Pérez", "Maria Pazos", "Júlia García", "Mariano Tamburro", 
  "June Echebarria", "Heidy Cava", "Alvaro Spotorno", "Esteban Adamuz", "Linda Lawson", 
  "Núria Budesca", "Carmen Lucio", "Guillem Rubio", "Percy Stiven", "David Cañete", 
  "Ariadna Ballestar", "Laia Vila", "Valeria Terrazas", "Samantha Alarcón", "David López", 
  "Mariona Torras", "Santiago Lleras", "Fanny Espinosa", "Sara Vidal", "Belén Alda", "Gerard Ger"
];

// Función para comprobar si ya existen tokens en Firestore
const tokensExist = async (): Promise<boolean> => {
  const tokensRef = collection(db, "validTokens");
  const querySnapshot = await getDocs(tokensRef);
  return !querySnapshot.empty; // Si la colección tiene documentos, retornamos true
};

// Función para generar y guardar los tokens en Firestore
export const saveTokensToFirestore = async () => {
  // Comprobamos si ya existen tokens en Firestore
  const tokensExistInFirestore = await tokensExist();
  
  if (tokensExistInFirestore) {
    console.log("Tokens ya han sido generados previamente. No se generarán nuevos tokens.");
    return; // Si ya existen tokens, no hacemos nada más
  }

  const tokensRef = collection(db, "validTokens");

  for (const evaluado of evaluados) {
    const token = generateToken(); // Genera un token para cada evaluado
    await addDoc(tokensRef, { token }); // Guarda el token en Firestore
    console.log(`Token generado para ${evaluado}: ${token}`);
  }

  console.log("Tokens generados y guardados en Firestore.");
};

// Llama a la función para generar y guardar los tokens si no existen
saveTokensToFirestore();
