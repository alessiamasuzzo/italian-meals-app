// screens/MealsListScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { styles } from "../theme/styles";
import { colors } from "../theme/tokens";
import { fetchItalianMeals } from "../services/mealApi";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import { MealCard } from "../components/MealCard";
import type { MealsListState } from "../types/meal";

export function MealsListScreen({ navigation }: any) {
  const [state, setState] = useState<MealsListState>({
    status: "idle",
    items: [],
    message: "",
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

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

  useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setFavoritesLoaded(true));
  }, []);

  function toggleFavorite(idMeal: string) {
    setFavoriteIds((current) => {
      const next = current.includes(idMeal)
        ? current.filter((id) => id !== idMeal)
        : [...current, idMeal];
      saveFavoriteIds(next);
      return next;
    });
  }

  if (state.status === "loading" || state.status === "idle" || !favoritesLoaded) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Caricamento piatti italiani...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.errorText}>{state.message}</Text>
        <Pressable style={styles.button} onPress={loadMeals}>
          <Text style={styles.buttonLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.listaContainer}>
      <Text style={styles.subtitle}>
        Preferiti salvati: {favoriteIds.length} (chiave app:v1:favs)
      </Text>

      {state.items.length === 0 ? (
        <Text style={styles.emptyText}>Nessun piatto italiano disponibile.</Text>
      ) : (
        <FlatList
          data={state.items}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.listaContent}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              isFavorite={favoriteIds.includes(item.idMeal)}
              onPress={(idMeal) => navigation.navigate("MealDetail", { idMeal })}
              onToggleFavorite={toggleFavorite}
            />
          )}
        />
      )}
    </View>
  );
}