// screens/SettingsScreen.tsx
import { Alert, Pressable, Switch, Text, View } from "react-native";
import { createStyles } from "../theme/styles";
import { useTheme } from "../contex/ThemeContex";
import { useFavorites } from "../contex/FavoritesContex";

export function SettingsScreen({ navigation }: any) {
  const { theme, isDark, toggleTheme } = useTheme();
  const { favoriteIds } = useFavorites();
  const styles = createStyles(theme);

  function handleLogout() {
    // TODO lab 11: collegare qui il logout reale con AuthContext
    // (cancella la sessione mock e naviga alla schermata Login)
    Alert.alert("Logout", "Qui va collegato il logout reale con AuthContext.");
  }

  return (
    <View style={styles.dettaglioContainer}>
      <View style={styles.dettaglioContent}>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Tema scuro</Text>
          <Switch
            accessibilityLabel="Attiva o disattiva il tema scuro"
            value={isDark}
            onValueChange={toggleTheme}
          />
        </View>
{/* bottone logout da implementare */}
        {/* <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressedFeedback]}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Esci dall'account"
        >
          <Text style={styles.buttonLabel}>Logout</Text>
        </Pressable> */}
      </View>
    </View>
  );
}