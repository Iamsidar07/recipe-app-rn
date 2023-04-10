import { ActivityIndicator, Alert, FlatList, Image,Pressable, SafeAreaView, StyleSheet,TextInput, TouchableOpacity, View } from 'react-native'
import React, {  useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText} from '../constants'
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';


const url = "https://recipe-app-api-7eo6.onrender.com/api/v1/findRecipe"

const FindRecipeFromIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [nameOfIngredient, setNameOfIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderIngredientItem = ({ item, index }) => {
    return <View style={styles.ingredientItemContainer}>
      <MyText text={item} style={styles.ingredientName} />
      <TouchableOpacity style={[styles.plusContainer, { backgroundColor: "#2d2d2d" }]} onPress={() => removeIngredient(index)}>
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
    if (isLoading || (ingredients.length===0)) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${url}`, {
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
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <MyText text={"Recipe Ideas."} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
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
        ingredients.length === 0 ? <View>
          <Image source={require("../assets/boy.png")} style={{ width: "100%", height: 400 }} resizeMode='cover' /> 
        </View>
        : 
        <FlatList data={ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%" }} />}

      <Pressable style={[styles.startCookBtnContainer, { backgroundColor: isLoading ? "#cbc39c" : "#0e0e0e" }]} onPress={handleDoneBtnPress}>
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

    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  backIcon: {
    position: "absolute",
    left: 0,
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#0d0b10",
    fontSize: 20,
  },
  introTitle: {
    fontSize: 20,
    fontFamily:"Karla-SemiBold",
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
    fontFamily: "Karla-Regular"
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
    backgroundColor: "#ffffff",
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
    fontFamily: "Karla-SemiBold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },






})