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
import { HomeScreen, WelcomeScreen, FindRecipeFromIngredientsScreen,RecipeDetailScreen,InstructionScreen } from "./screens"

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
    "Sen-Bold": require("./assets/fonts/Sen-Bold.ttf"),
    "Sen-Regular": require("./assets/fonts/Sen-Regular.ttf"),
  });

  if (!loaded) return null;
  return (
    <View style={styles.container}>
      <StatusBar style="auto"  animated/>
      <NavigationContainer theme={FavouriteTheme}  >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='WelcomeScreen'  >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: "WelcomeScreen" }} />
          <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ title: "RecipeDetailScreen" }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "HomeScreen" }} />
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
