// context/FavoritesContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

interface FavoritesContextValue {
  favoriteIds: string[];
  isLoading: boolean;
  isFavorite: (idMeal: string) => boolean;
  toggleFavorite: (idMeal: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setIsLoading(false));
  }, []);

  function persist(ids: string[]) {
    setFavoriteIds(ids);
    saveFavoriteIds(ids);
  }

  function isFavorite(idMeal: string) {
    return favoriteIds.includes(idMeal);
  }

  function toggleFavorite(idMeal: string) {
    persist(
      favoriteIds.includes(idMeal)
        ? favoriteIds.filter((id) => id !== idMeal)
        : [...favoriteIds, idMeal],
    );
  }

  const value = useMemo(
    () => ({ favoriteIds, isLoading, isFavorite, toggleFavorite }),
    [favoriteIds, isLoading],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve stare dentro FavoritesProvider");
  }
  return context;
}