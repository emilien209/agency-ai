"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  auth: Auth | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  auth: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    if (app) {
      const authInstance = getAuth(app);
      setAuth(authInstance);
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const signInWithGoogle = async () => {
  const auth = getAuth(app);
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithGitHub = async () => {
  const auth = getAuth(app);
  if (!auth) return;
  const provider = new GithubAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
    throw error;
  }
};

export const emailSignIn = async (email: string, password: string): Promise<User | null> => {
  const auth = getAuth(app);
  if (!auth) return null;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};


export const signOut = async () => {
  const auth = getAuth(app);
  if (!auth) return;
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};