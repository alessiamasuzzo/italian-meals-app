// components/MealCard.tsx
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "../theme/styles";
import type { MealSummary } from "../types/meal";

type Props = {
  meal: MealSummary;
  isFavorite: boolean;
  onPress: (idMeal: string) => void;
  onToggleFavorite: (idMeal: string) => void;
};

export function MealCard({ meal, isFavorite, onPress, onToggleFavorite }: Props) {
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

      <Pressable style={styles.favButton} onPress={() => onToggleFavorite(meal.idMeal)}>
        <Text style={styles.favText}>{isFavorite ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}