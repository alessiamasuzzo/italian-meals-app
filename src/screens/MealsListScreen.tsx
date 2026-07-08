// screens/MealsListScreen.tsx
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { styles } from "../theme/styles";
import { colors } from "../theme/tokens";
import { fetchItalianMeals } from "../services/mealApi";
import { MealCard } from "../components/MealCard";
import type { MealsListState } from "../types/meal";

export function MealsListScreen({ navigation }: any) {
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

  if (state.status === "loading" || state.status === "idle") {
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
              onPress={(idMeal) => navigation.navigate("MealDetail", { idMeal })}
            />
          )}
        />
      )}
    </View>
  );
}