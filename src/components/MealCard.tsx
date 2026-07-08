// components/MealCard.tsx
import { View, Text, Image, Pressable, StyleProp, ViewStyle } from "react-native";
import { styles } from "../theme/styles";
import { useFavorites } from "../contex/FavoritesContex";
import type { MealSummary } from "../types/meal";

type Props = {
  meal: MealSummary;
  onPress: (idMeal: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function MealCard({ meal, onPress, style }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(meal.idMeal);

  return (
    <View style={[styles.mealCard, style]}>
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