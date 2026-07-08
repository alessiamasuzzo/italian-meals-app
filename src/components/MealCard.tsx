// components/MealCard.tsx
import { View, Text, Image, Pressable, StyleProp, ViewStyle } from "react-native";
import { createStyles } from "../theme/styles";
import { useFavorites } from "../contex/FavoritesContex";
import { useTheme } from "../contex/ThemeContex";
import type { MealSummary } from "../types/meal";

type Props = {
  meal: MealSummary;
  onPress: (idMeal: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function MealCard({ meal, onPress, style }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const active = isFavorite(meal.idMeal);

  return (
    <View style={[styles.mealCard, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Apri dettaglio ${meal.strMeal}`}
        style={({ pressed }) => [
          { flexDirection: "row", alignItems: "center", flex: 1 },
          pressed && styles.pressedFeedback,
        ]}
        onPress={() => onPress(meal.idMeal)}
      >
        <Image source={{ uri: meal.strMealThumb }} style={styles.mealThumb} />
        <Text style={styles.mealTitle} numberOfLines={2} maxFontSizeMultiplier={1.4}>
          {meal.strMeal}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          active ? `Rimuovi ${meal.strMeal} dai preferiti` : `Aggiungi ${meal.strMeal} ai preferiti`
        }
        style={({ pressed }) => [styles.favButton, pressed && styles.pressedFeedback]}
        onPress={() => toggleFavorite(meal.idMeal)}
      >
        <Text style={styles.favText}>{active ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}