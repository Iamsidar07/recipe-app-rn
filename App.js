import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WelcomeScreen, FindRecipeFromIngredientsScreen,RecipeDetailScreen,InstructionScreen, CongratulationScreen } from "./screens"
const Stack = createNativeStackNavigator();

export default function App() {

  const FavouriteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ddebf3',
    },
  };

  const [loaded] = useFonts({
    "GoogleSans-Bold": require("./assets/fonts/GoogleSans-Bold.ttf"),
    "GoogleSans-Medium": require("./assets/fonts/GoogleSans-Medium.ttf"),
    "GoogleSans-Regular": require("./assets/fonts/GoogleSans-Regular.ttf"),
  });

  if (!loaded) return null;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer theme={FavouriteTheme}  >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='WelcomeScreen'  >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: "WelcomeScreen" }} />
          <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ title: "RecipeDetailScreen" }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "HomeScreen" }} />
          <Stack.Screen name="CongratulationScreen" component={CongratulationScreen} options={{ title: "CongratulationScreen" }} />
          <Stack.Screen name="InstructionScreen" component={InstructionScreen} options={{ title: "InstructionScreen" }} />
          <Stack.Screen name="FindRecipeFromIngredientsScreen" component={FindRecipeFromIngredientsScreen} options={{ title: "FindRecipeFromIngredientsScreen" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ddebf3",
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
