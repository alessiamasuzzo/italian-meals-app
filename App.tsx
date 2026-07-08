// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesProvider } from "./src/contex/FavoritesContex";
import { MealsListScreen } from "./src/screens/MealsListScreen";
import { MealDetailScreen } from "./src/screens/MealDetailScreen";
import { FavoritesScreen } from "./src/screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MealsList">
          <Stack.Screen
            name="MealsList"
            component={MealsListScreen}
            options={{ title: "Piatti italiani" }}
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{ title: "Dettaglio" }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: "I tuoi preferiti" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}