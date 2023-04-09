import { ActivityIndicator, Alert, FlatList, Image,Pressable, SafeAreaView, StyleSheet,TextInput, TouchableOpacity, View } from 'react-native'
import React, {  useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText} from '../constants'
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';


const baseUrl = "https://recipe-app-api-7eo6.onrender.com/api/v1"

const FindRecipeFromIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [nameOfIngredient, setNameOfIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderIngredientItem = ({ item, index }) => {
    return <View style={styles.ingredientItemContainer}>
      <MyText text={item} style={styles.ingredientName} />
      <TouchableOpacity style={[styles.plusContainer, { backgroundColor: "#0e0e0e" }]} onPress={() => removeIngredient(index)}>
        <Entypo name="cross" size={24} color="white" />
      </TouchableOpacity>

    </View>
  }
  const addIngredientToIngredients = () => {
    setIngredients([...ingredients, nameOfIngredient]);
    setNameOfIngredient("");
  }
  const removeIngredient = (id) => {
    setIngredients((prevIngedients) => prevIngedients.filter((item) => item !== prevIngedients[id]))
  }
  const handleDoneBtnPress = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/findRecipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
      });
      const data = await res.json();
      console.log(data)
      setIngredients([]);
      navigation.navigate("RecipeDetailScreen", { recipeData: data.result });

    } catch (error) {
      // Alert.alert(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(isLoading);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back" size={28} color="#bdbdbd" />
        </TouchableOpacity>
        <MyText text={"Find Recipe Ideas."} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
      </View>
      <MyText text={"What's in your kitchen."} style={styles.introTitle} />
      <MyText text={"Enter up to 2 ingredients"} style={styles.introDesc} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Type and add your ingredients...' onChangeText={(value) => setNameOfIngredient(value)} placeholderTextColor={"#bdbdbd"} value={nameOfIngredient} />
        <TouchableOpacity style={styles.plusContainer} onPress={addIngredientToIngredients}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {
        ingredients.length === 0 ? <Image source={require("../assets/cooking.gif")} style={{ width: "100%", height: 400 }} resizeMode='cover' /> 
        : 
        <FlatList data={ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%" }} />}

      <Pressable style={[styles.startCookBtnContainer, { backgroundColor: isLoading ? "#dfdfdf" : "#0e0e0e" }]} onPress={handleDoneBtnPress}>
        {
          isLoading ? <ActivityIndicator color="white" size={'large'} /> : (<><MyText text={"Find recipe"} style={styles.startCookBtnText} />
            <Ionicons name="checkmark-done" size={24} color="#e3e3e3" style={styles.startCookBtnText} /></>)
        }

      </Pressable>


    </SafeAreaView>

  )
}

export default FindRecipeFromIngredientsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: "#fbfcfe",
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    left: 0,
  },
  title: {
    color: "#0d0b10",
    fontSize: 20,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 24,
  },
  introDesc: {
    color: "#bdbdbd",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontFamily: "GoogleSans-Regular"
  },
  plusContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#36BD69",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  ingredientItemContainer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f6f8fc",
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ingredientName: {
    color: "#111742",
  },
  startCookBtnContainer: {
    padding: 20,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 60,
    right: 60,
  },
  startCookBtnText: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },






})