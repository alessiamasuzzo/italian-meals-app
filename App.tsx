// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealsListScreen } from "./src/screens/MealsListScreen";
import { MealDetailScreen } from "./src/screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}