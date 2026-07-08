// services/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = "app:v1:favs";

export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // ignora errori di storage
  }
}

export const THEME_KEY = "app:v1:theme";

export async function loadThemeMode(): Promise<"light" | "dark"> {
  try {
    const raw = await AsyncStorage.getItem(THEME_KEY);
    return raw === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export async function saveThemeMode(mode: "light" | "dark"): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, mode);
  } catch {
    // ignora errori di storage
  }
}