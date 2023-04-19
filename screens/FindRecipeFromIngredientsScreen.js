import { ActivityIndicator, Alert, FlatList, Image, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { boxShadow, headingText } from '../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Lottie from "lottie-react-native";

const url = "https://recipe-app-api-7eo6.onrender.com/api/v1/findRecipe"

const FindRecipeFromIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [nameOfIngredient, setNameOfIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderIngredientItem = ({ item, index }) => {
    return <View style={[styles.ingredientItemContainer, boxShadow]}>
      <MyText text={item} style={styles.ingredientName} />
      <TouchableOpacity onPress={() => removeIngredient(index)} >
        <Image source={require("../assets/bin.png")} style={{ width: 20, height: 20 }} resizeMode='contain' />
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
    if (isLoading || (ingredients.length === 0)) {
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
      <View style={[styles.headerContainer, boxShadow]}>
        <TouchableOpacity style={[styles.backIcon, boxShadow]} onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <MyText text={"Recipe Ideas."} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
      </View>
      <MyText text={"What's in your kitchen."} style={styles.introTitle} />
      <MyText text={"Enter up to 2 ingredients"} style={styles.introDesc} />
      <View style={[styles.inputContainer, boxShadow]}>
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
          <FlatList data={ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%", paddingHorizontal: 1, }} />}

      {
        isLoading && <View style={[StyleSheet.absoluteFillObject, { backgroundColor:"#0000006b",alignItems:"center",justifyContent:"center" }]}>
          <Lottie source={require("../assets/cooking.json")} autoPlay style={{ width:"100%",}} loop/>
        </View>
      }

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
    paddingTop: Constants.statusBarHeight + 20,

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
    fontSize: 25,
    fontFamily: "Sen-Bold",
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
    fontFamily: "Sen-Regular"
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
    paddingHorizontal: 10,
    paddingVertical:15,
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
    fontFamily: "Sen-Bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },






})