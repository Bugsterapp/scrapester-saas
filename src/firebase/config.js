import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);