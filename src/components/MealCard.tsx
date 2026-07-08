// components/MealCard.tsx
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "../theme/styles";
import type { MealSummary } from "../types/meal";

type Props = {
  meal: MealSummary;
  onPress: (idMeal: string) => void;
};

export function MealCard({ meal, onPress }: Props) {
  return (
    <Pressable style={styles.mealCard} onPress={() => onPress(meal.idMeal)}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.mealThumb} />
      <Text style={styles.mealTitle} numberOfLines={2}>
        {meal.strMeal}
      </Text>
    </Pressable>
  );
}