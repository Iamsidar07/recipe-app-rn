import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from "../../../MyText";
import { boxShadow, colors } from '../../../constants';
const RecipeCard = ({ recipeData, navigation }) => {
  const { title, ingredients, time, recipeImageUrl, category } = recipeData;

  const addToFavorite = () => {
    //add to favorite
  }
  return (<TouchableOpacity style={[styles.container,boxShadow]} onPress={() => navigation.navigate("RecipeDetailScreen", { recipeData })}>
    <Image source={{ uri: recipeImageUrl }} style={styles.image} resizeMode='cover' />
    <TouchableOpacity style={[styles.saveIconContainer,boxShadow]} onPress={addToFavorite}>
      <Image source={require("../../../assets/save.png")} style={{width:20,height:20}} resizeMode='contain'/>
    </TouchableOpacity>
    <View style={styles.recipeInfoContainer}>
      <MyText text={title} style={styles.recipeTitle} />
      <MyText text={`${category} | ${ingredients[0].ingredientEmoji} ${ingredients.length} Ingredients | ⏳ ${time}`} style={styles.ingredientsAndTimeText} />
    </View>
  </TouchableOpacity>
  )
}

export default RecipeCard

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height:330,
    backgroundColor:"#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomEndRadius:5,
    borderBottomStartRadius:5,
  },
  image: {
    width:"100%",
    height:"70%",
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  saveIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10
  },
  recipeInfoContainer: {
    paddingTop: 15,
    paddingHorizontal:5,
    width: "100%",

  },
  recipeTitle: {
    fontSize: 20,
  },
  ingredientsAndTimeText: {
    marginTop: 10,
    opacity:0.5,
  }
})