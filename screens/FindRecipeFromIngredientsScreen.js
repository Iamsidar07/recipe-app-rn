import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { boxShadow, colors, headingText } from '../constants'
import { Ionicons, AntDesign,  } from '@expo/vector-icons';
import Lottie from "lottie-react-native";
import { Seperator } from '../components'

const url = "https://recipe-app-api-7eo6.onrender.com/api/v1/findRecipe"

const FindRecipeFromIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [nameOfIngredient, setNameOfIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderIngredientItem = ({ item, index }) => {
    return <View style={[styles.ingredientItemContainer, boxShadow]}>
      <MyText text={item} style={styles.ingredientName} />
      <TouchableOpacity onPress={() => removeIngredient(index)} >
        <AntDesign name="minuscircleo" size={24} color="black" />
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
      console.log({data})
      setIngredients([]);
      navigation.navigate("RecipeDetailScreen", { recipeData: data.result });
    } catch (error) {
      // Alert.alert(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(isLoading,ingredients);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, boxShadow]}>
        <TouchableOpacity style={[styles.backIcon, boxShadow]} onPress={() => navigation.goBack()} >
          <AntDesign name="left" size={16} color={colors.secondaryColor} />
        </TouchableOpacity>
        <MyText text={"Recipe Ideas."} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
      </View>
      <Seperator/>
      <View style={styles.contentContainer}>
        <MyText text={"What's in your kitchen."} style={styles.introTitle} />
        <MyText text={"Enter atleast 2 ingredients"} style={styles.introDesc} />
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


        <Pressable style={[styles.startCookBtnContainer, { backgroundColor: isLoading ? colors.accentColor : colors.primaryColor }]} onPress={handleDoneBtnPress}>
          {
            isLoading ? <ActivityIndicator color={colors.primaryColor} size={'large'} /> : (<><MyText text={"Find recipe"} style={styles.startCookBtnText} />
              <Ionicons name="checkmark-done" size={24} color="#e3e3e3" style={styles.startCookBtnText} /></>)
          }

        </Pressable>
      </View>
    </SafeAreaView>

  )
}

export default FindRecipeFromIngredientsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
  },
  contentContainer:{
    paddingHorizontal: 15,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:15,
  },
  backIcon: {
    position: "absolute",
    left: 5,
    backgroundColor: "white",
    width: 40,
    height: 40,
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
    color:colors.primaryColor,
  },
  introDesc: {
    color: "#bdbdbd",
    marginTop: 5,
    color:colors.secondaryColor
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
    backgroundColor: colors.secondaryColor,
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