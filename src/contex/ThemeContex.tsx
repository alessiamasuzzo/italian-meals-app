// context/ThemeContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { lightTheme, darkTheme, AppTheme } from "../theme/tokens";
import { loadThemeMode, saveThemeMode } from "../services/storage";

interface ThemeContextValue {
  theme: AppTheme;
  isDark: boolean;
  isLoading: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemeMode()
      .then((mode) => setIsDark(mode === "dark"))
      .finally(() => setIsLoading(false));
  }, []);

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current;
      saveThemeMode(next ? "dark" : "light");
      return next;
    });
  }

  const theme = isDark ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({ theme, isDark, isLoading, toggleTheme }),
    [theme, isDark, isLoading],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve stare dentro ThemeProvider");
  }
  return context;
}