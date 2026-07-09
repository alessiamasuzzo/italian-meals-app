// screens/MealsListScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, useWindowDimensions, View } from "react-native";
import { createStyles } from "../theme/styles";
import { colors, spacing } from "../theme/tokens";
import { fetchItalianMeals } from "../services/mealApi";
import { useFavorites } from "../contex/FavoritesContex";
import { MealCard } from "../components/MealCard";
import type { MealsListState } from "../types/meal";
import { useTheme } from "../contex/ThemeContex";
import { useAuth } from "../contex/AuthContext";
import { Avatar } from "../components/Avatar";

export function MealsListScreen({ navigation }: any) {
  const { favoriteIds, isLoading: favoritesLoading } = useFavorites();
  const { theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [state, setState] = useState<MealsListState>({
    status: "idle",
    items: [],
    message: "",
  });

  async function loadMeals() {
    setState({ status: "loading", items: [], message: "" });
    try {
      const data = await fetchItalianMeals();
      setState({ status: "success", items: data, message: "" });
    } catch {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  if (state.status === "loading" || state.status === "idle" || favoritesLoading) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text }}>Caricamento piatti italiani...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.errorText}>{state.message}</Text>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressedFeedback]}
          onPress={loadMeals}
        >
          <Text style={styles.buttonLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.listaContainer}>

      {user && (
        <View style={styles.headerProfilo}>
          <Avatar uri={user.avatarUri} size={40} />
          <Text style={styles.headerNome}>{user.name}</Text>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { marginBottom: spacing.sm, marginLeft: spacing.sm },
          pressed && styles.pressedFeedback,
        ]}
        onPress={() => navigation.navigate("Favorites")}
        accessibilityRole="button"
        accessibilityLabel="Vai alla schermata preferiti"
      >
        <Text style={styles.buttonLabel}>Vai ai preferiti</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { marginBottom: spacing.sm, marginLeft: spacing.sm },
          pressed && styles.pressedFeedback,
        ]}
        onPress={() => navigation.navigate("Settings")}
        accessibilityRole="button"
        accessibilityLabel="Vai alle impostazioni"
      >
        <Text style={styles.buttonLabel}>Impostazioni</Text>
      </Pressable>

      {state.items.length === 0 ? (
        <Text style={styles.emptyText}>Nessun piatto italiano disponibile.</Text>
      ) : (
        <FlatList
          key={isWide ? "wide" : "narrow"}
          data={state.items}
          numColumns={isWide ? 2 : 1}
          columnWrapperStyle={isWide ? styles.wideRow : undefined}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.listaContent}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              style={isWide ? styles.mealCardWide : undefined}
              onPress={(idMeal) => navigation.navigate("MealDetail", { idMeal })}
            />
          )}
        />
      )}
    </View>
  );
}