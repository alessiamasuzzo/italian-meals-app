// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { MealsListScreen } from "./src/screens/MealsListScreen";

const Stack = createNativeStackNavigator();

// Schermata Dettaglio temporanea, solo per non far crashare la navigazione.
// La sostituiamo con quella vera nel prossimo passo.
function MealDetailScreen({ route }: any) {
  const { idMeal } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dettaglio piatto - idMeal: {idMeal}</Text>
    </View>
  );
}

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