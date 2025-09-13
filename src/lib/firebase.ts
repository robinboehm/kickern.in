import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase-Konfiguration - Diese Werte müssen durch echte Werte ersetzt werden
const firebaseConfig = {
  apiKey: "AIzaSyDB4ULFPbiWLxjU_DjpLKIyGWzhTB3slJc",
  authDomain: "kickern-in-8b5d3.firebaseapp.com",
  projectId: "kickern-in-8b5d3",
  storageBucket: "kickern-in-8b5d3.firebasestorage.app",
  messagingSenderId: "221752279600",
  appId: "1:221752279600:web:c5dee12791df41b6a4a3f5"
};

// Firebase initialisieren
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);