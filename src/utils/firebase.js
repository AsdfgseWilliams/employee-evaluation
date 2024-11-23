import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWKeFrORHBUO-mJBxxIt8V902iv2lvk98",
  authDomain: "evaluacion-cronuts.firebaseapp.com",
  projectId: "evaluacion-cronuts",
  storageBucket: "evaluacion-cronuts.firebasestorage.app",
  messagingSenderId: "803689661110",
  appId: "1:803689661110:web:bf053714e737fa4e815c17"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
