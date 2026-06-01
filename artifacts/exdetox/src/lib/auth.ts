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

export async function signInWithGoogle(useRedirect = false): Promise<User | null> {
  try {
    console.log("signInWithGoogle called with useRedirect:", useRedirect);
    
    // Always try popup first - simpler and works better across devices
    const result = await signInWithPopup(auth, googleProvider);
    console.log("signInWithPopup successful:", result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("signInWithPopup failed:", error.code, error.message);
    
    // Only fallback to redirect if popup was blocked/denied
    if (useRedirect || error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
      console.log("Attempting redirect flow...");
      try {
        await signInWithRedirect(auth, googleProvider);
        return null; // Page will redirect
      } catch (redirectError) {
        console.error("signInWithRedirect also failed:", redirectError);
        throw redirectError;
      }
    }
    
    throw error;
  }
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
