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

export const SESSION_KEY = "app:v1:session";

export async function loadSession(): Promise<{ email: string; name: string; avatarUri: string } | null> {
  try {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveSession(user: { email: string; name: string; avatarUri: string } | null): Promise<void> {
  try {
    if (user === null) {
      await AsyncStorage.removeItem(SESSION_KEY);
    } else {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
  } catch {
    // ignora errori di storage
  }
}