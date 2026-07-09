// context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { validateLogin } from "../services/auth";
import { loadSession, saveSession } from "../services/storage";

interface SessionUser {
  email: string;
  name: string;
  avatarUri: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  function login(email: string, password: string) {
    const found = validateLogin(email, password);
    if (!found) return false;

    const sessionUser = {
      email: found.email,
      name: found.name,
      avatarUri: found.avatarUri,
    };
    setUser(sessionUser);
    saveSession(sessionUser);
    return true;
  }

  function logout() {
    setUser(null);
    saveSession(null);
  }

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve stare dentro AuthProvider");
  }
  return context;
}