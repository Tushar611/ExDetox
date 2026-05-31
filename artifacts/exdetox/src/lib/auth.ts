import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export async function signInWithGoogle(useRedirect = false): Promise<User> {
  if (useRedirect) {
    await signInWithRedirect(auth, googleProvider);
    // The promise never resolves here because the browser navigates away.
    return new Promise(() => {});
  }

  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function getGoogleRedirectResult(): Promise<User | null> {
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
