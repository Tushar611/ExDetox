import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { getGoogleRedirectResult, onAuthChange } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  debugStatus: string;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, debugStatus: "init" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugStatus, setDebugStatus] = useState("init");

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};
    let redirectResolvedUid: string | null = null;

    const bootstrapAuth = async () => {
      setDebugStatus("checking-redirect-result");

      try {
        const redirectUser = await getGoogleRedirectResult();
        if (redirectUser) {
          if (!active) return;
          redirectResolvedUid = redirectUser.uid;
          setUser(redirectUser);
          setLoading(false);
          setDebugStatus(`redirect-user:${redirectUser.uid}`);
        } else {
          setDebugStatus("redirect-empty");
        }
      } catch {
        // Auth page surfaces user-facing errors; the provider just waits for Firebase to settle.
        setDebugStatus("redirect-error");
      }

      if (!active) return;

      unsubscribe = onAuthChange((u) => {
        if (!active) return;
        if (!u && redirectResolvedUid) {
          setDebugStatus(`redirect-persist-wait:${redirectResolvedUid}`);
          return;
        }
        setUser(u);
        setDebugStatus(u ? `auth-user:${u.uid}` : "auth-null");
        setLoading(false);
      });
    };

    bootstrapAuth();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading, debugStatus }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
