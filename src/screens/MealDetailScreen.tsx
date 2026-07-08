// screens/MealDetailScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../theme/styles";
import { colors } from "../theme/tokens";
import { fetchMealById, extractIngredients } from "../services/mealApi";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import type { MealDetailState } from "../types/meal";

export function MealDetailScreen({ route }: any) {
  const { idMeal } = route.params;

  const [state, setState] = useState<MealDetailState>({
    status: "idle",
    meal: null,
    message: "",
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  async function loadDetail() {
    if (!idMeal) {
      setState({ status: "error", meal: null, message: "idMeal non valido." });
      return;
    }
    setState({ status: "loading", meal: null, message: "" });
    try {
      const data = await fetchMealById(idMeal);
      if (!data) {
        setState({ status: "error", meal: null, message: "Piatto non trovato." });
        return;
      }
      setState({ status: "success", meal: data, message: "" });
    } catch {
      setState({
        status: "error",
        meal: null,
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  useEffect(() => {
    loadDetail();
  }, [idMeal]);

  useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setFavoritesLoaded(true));
  }, []);

  function toggleFavorite() {
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
        <Text>Caricamento dettaglio...</Text>
      </View>
    );
  }

  if (state.status === "error" || !state.meal) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.errorText}>{state.message}</Text>
        <Pressable style={styles.button} onPress={loadDetail}>
          <Text style={styles.buttonLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const meal = state.meal;
  const ingredienti = extractIngredients(meal);
  const isFavorite = favoriteIds.includes(meal.idMeal);

  return (
    <ScrollView style={styles.dettaglioContainer} contentContainerStyle={styles.dettaglioContent}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.dettaglioImmagine} />

      <View style={styles.dettaglioTitoloRow}>
        <Text style={styles.dettaglioTitolo}>{meal.strMeal}</Text>
        <Pressable style={styles.favButton} onPress={toggleFavorite}>
          <Text style={styles.favText}>{isFavorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>

      <Text style={styles.dettaglioCategoria}>
        {meal.strCategory} - {meal.strArea}
      </Text>

      <Text style={styles.sezioneTitolo}>Ingredienti</Text>
      {ingredienti.map((ing, index) => (
        <View key={index} style={styles.ingredienteRow}>
          <Text>{ing.name}</Text>
          <Text>{ing.measure}</Text>
        </View>
      ))}

      <Text style={styles.sezioneTitolo}>Istruzioni</Text>
      <Text style={styles.istruzioniTesto}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}