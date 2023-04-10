import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
import { HomeScreen, WelcomeScreen, FindRecipeFromIngredientsScreen,RecipeDetailScreen,InstructionScreen, CongratulationScreen } from "./screens"

const Stack = createNativeStackNavigator();

export default function App() {

  const FavouriteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f7f7f7',
    },
  };

  const [loaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
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
    // paddingHorizontal:4,
    // backgroundColor: "#ddebf3",
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
