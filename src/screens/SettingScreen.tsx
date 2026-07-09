// screens/SettingsScreen.tsx
import { Pressable, Switch, Text, View } from "react-native";
import { createStyles } from "../theme/styles";
import { useTheme } from "../contex/ThemeContex";
import { useFavorites } from "../contex/FavoritesContex";
import { useAuth } from "../contex/AuthContext";
import { Avatar } from "../components/Avatar";

export function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { favoriteIds } = useFavorites();
  const { user, logout } = useAuth();
  const styles = createStyles(theme);

  return (
    <View style={styles.dettaglioContainer}>
      <View style={styles.dettaglioContent}>

        {user && (
          <View style={styles.headerProfilo}>
            <Avatar uri={user.avatarUri} />
            <Text style={styles.headerNome}>{user.name}</Text>
          </View>
        )}

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Tema scuro</Text>
          <Switch
            accessibilityLabel="Attiva o disattiva il tema scuro"
            value={isDark}
            onValueChange={toggleTheme}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressedFeedback]}
          onPress={logout}
          accessibilityRole="button"
          accessibilityLabel="Esci dall'account"
        >
          <Text style={styles.buttonLabel}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}