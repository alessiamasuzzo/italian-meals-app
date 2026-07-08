// screens/MealsListScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, useWindowDimensions, View } from "react-native";
import { styles } from "../theme/styles";
import { colors } from "../theme/tokens";
import { fetchItalianMeals } from "../services/mealApi";
import { useFavorites } from "../contex/FavoritesContex";
import { MealCard } from "../components/MealCard";
import type { MealsListState } from "../types/meal";

export function MealsListScreen({ navigation }: any) {
  const { favoriteIds, isLoading: favoritesLoading } = useFavorites();
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
        Preferiti salvati: {favoriteIds.length} · Colonne: {isWide ? 2 : 1}
      </Text>

      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.buttonLabel}>Vai ai preferiti</Text>
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