// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesProvider } from "./src/contex/FavoritesContex";
import { MealsListScreen } from "./src/screens/MealsListScreen";
import { MealDetailScreen } from "./src/screens/MealDetailScreen";
import { FavoritesScreen } from "./src/screens/FavoritesScreen";
import { ThemeProvider } from "./src/contex/ThemeContex";
import { SettingsScreen } from "./src/screens/SettingScreen";
import { AuthProvider, useAuth } from "./src/contex/AuthContext";
import { LoginScreen } from "./src/screens/LoginScreen";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "italian-meals-app://"],
  config: {
    screens: {
      MealsList: "meals",
      MealDetail: "meal/:idMeal",
      Favorites: "favorites",
      Settings: "settings",
      Login: "login",
    },
  },
};

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
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
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Impostazioni" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
