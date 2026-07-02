import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{title: "Piatti"}}
        />
        <Stack.Screen
        name='Details'
        component={DetailsScreen}
        options={{title: "Dettaglio"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});


