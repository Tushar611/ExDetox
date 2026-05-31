import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { getGoogleRedirectResult, onAuthChange } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    const bootstrapAuth = async () => {
      try {
        await getGoogleRedirectResult();
      } catch {
        // Auth page surfaces user-facing errors; the provider just waits for Firebase to settle.
      }

      if (!active) return;

      unsubscribe = onAuthChange((u) => {
        if (!active) return;
        setUser(u);
        setLoading(false);
      });
    };

    bootstrapAuth();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
