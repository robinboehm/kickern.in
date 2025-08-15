import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { auth } from './firebase';
import type { AuthUser } from '../types';

// Login
export const login = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    };
  } catch (error) {
    console.error('Login-Fehler:', error);
    throw error;
  }
};

// Registrierung
export const register = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    };
  } catch (error) {
    console.error('Registrierungs-Fehler:', error);
    throw error;
  }
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout-Fehler:', error);
    throw error;
  }
};

// Auth State Listener
export const onAuthChange = (callback: (user: AuthUser | null) => void): (() => void) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });
    } else {
      callback(null);
    }
  });
};

// Aktueller Benutzer
export const getCurrentUser = (): AuthUser | null => {
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
  }
  return null;
};

// Prüfen ob Benutzer eingeloggt ist
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};