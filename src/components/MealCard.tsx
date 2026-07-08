// components/MealCard.tsx
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "../theme/styles";
import { useFavorites } from "../contex/FavoritesContex";
import type { MealSummary } from "../types/meal";

type Props = {
  meal: MealSummary;
  onPress: (idMeal: string) => void;
};

export function MealCard({ meal, onPress }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(meal.idMeal);

  return (
    <View style={styles.mealCard}>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        onPress={() => onPress(meal.idMeal)}
      >
        <Image source={{ uri: meal.strMealThumb }} style={styles.mealThumb} />
        <Text style={styles.mealTitle} numberOfLines={2}>
          {meal.strMeal}
        </Text>
      </Pressable>

      <Pressable style={styles.favButton} onPress={() => toggleFavorite(meal.idMeal)}>
        <Text style={styles.favText}>{active ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}