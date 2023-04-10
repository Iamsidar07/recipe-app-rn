import { ActivityIndicator, Alert, FlatList, Image, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories } from '../constants'
import { AntDesign } from '@expo/vector-icons';
import { RecipeCard, BottomTab } from "../components";

const HomeScreen = ({ navigation }) => {
  const [searchInputText, setSearchInputText] = useState("all");
  const [category, setCategory] = useState("");
  const [recipeDatas, setRecipeDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(searchInputText);

  const url = "https://recipe-app-api-7eo6.onrender.com/api/v1/all"

  
  useLayoutEffect(() => {
    const getAllRecipe = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${url}`);
        const data = await res.json();
        setRecipeDatas(data.result);
        console.log(data.result.reverse())
        const newRecipeDatas = data.result.filter((item) => item.category.toLowerCase().includes(category.toLocaleLowerCase()));
        // console.log({newRecipeDatas});
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getAllRecipe();
  }, [])

  const renderCategory = ({ item }) => {
    return (
      <Pressable style={[styles.categoryContainer, { backgroundColor: category.toLocaleLowerCase() === item.name.toLocaleLowerCase() ? "#0e0e0e" : "#ffffff", },]} onPress={() => setCategory(item.name)}>
        <MyText text={item.name} style={[styles.categoryText, { color: category.toLocaleLowerCase() === item.name.toLocaleLowerCase() ? "white" : "gray" }]} />
      </Pressable>
    )
  }
  const renderRecipeCard = ({ item }) => <RecipeCard key={item.id} recipeData={item} navigation={navigation} />
  return (
    <SafeAreaView style={styles.container}>

      <MyText text={"Find Best Recipe"} style={[headingText, styles.title]} />
      <MyText text={"For Cooking."} style={[headingText, styles.title]} />
      <View style={styles.searchInputContainer}>
        <AntDesign name="search1" size={24} color="#bdbdbd" />
        <TextInput style={styles.searchInput} placeholder='Search Recipe' onChangeText={(value) => setSearchInputText(value)} placeholderTextColor={"#bdbdbd"} />
      </View>
      <FlatList data={categories} renderItem={renderCategory} horizontal contentContainerStyle={{ height: 40, marginTop: 10,marginBottom:25 }} showsHorizontalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />
      {
        (isLoading && (recipeDatas === null)) ?
          <View style={styles.loader}>
            <Image source={require("../assets/cutlery.gif")} style={{ width: 200, height: 200,}} resizeMode='cover' />
          </View>
          : <FlatList data={recipeDatas} renderItem={renderRecipeCard} contentContainerStyle={{ gap: 5, paddingBottom: "35%", paddingTop:10 }} showsVerticalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />
      }


      <BottomTab navigation={navigation} />
    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 15,
    paddingHorizontal: 15,
    // padding:10,
  },
  loader:{
    width: "100%",
    height: "74%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#0d0b10",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#ffffff",
    color: "#bdbdbd",
    fontFamily: "GoogleSans-Regular"
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 7,
  },
  categoryText: {
    color: "#6d6d6d",

  },



})