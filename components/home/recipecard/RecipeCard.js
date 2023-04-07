import { Image, StyleSheet,TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from "../../../MyText";
import { Fontisto } from '@expo/vector-icons';

const RecipeCard = ({ recipeData,navigation }) => {
  const { title, ingredients, time, image } = recipeData;

  const addToFavorite=()=>{
    //add to favorite
  }
  return ( <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("RecipeDetailScreen",{recipeData})}>
      <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />
      <TouchableOpacity style={styles.saveIconContainer} onPress={addToFavorite}>
        <Fontisto name="favorite" size={32} color="white" />
      </TouchableOpacity>
      <View style={styles.recipeInfoContainer}>
        <MyText text={title} style={styles.recipeTitle} />
        <MyText text={`${ingredients.length} Ingredients | ${time}`} style={styles.ingredientsAndTimeText} />
      </View>
    </TouchableOpacity>
  )
}

export default RecipeCard

const styles = StyleSheet.create({

  image:{
    width:"100%",
    height:380,
    borderRadius:30,
    position:"relative",
  },
  saveIconContainer:{
    width:60,
    height:60,
    borderRadius:20,
    backgroundColor:"#614b3d",
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    top:10,
    right:10
  },
  recipeInfoContainer:{
    padding:10,
    position:"absolute",
    bottom:5,
    width:"100%",
  },
  recipeTitle:{
    fontSize:28,
    color:"white",
    fontWeight:"bold",
  },
  ingredientsAndTimeText:{
    fontSize:18,
    color:"#e4e1df",
    marginTop:10,
  }
})