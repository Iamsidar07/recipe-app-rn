import { ActivityIndicator, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories } from '../constants'
import { AntDesign } from '@expo/vector-icons';
import { RecipeCard } from "../components";
const HomeScreen = ({ navigation }) => {
  const [searchInputText, setSearchInputText] = useState("");
  const [category, setCategory] = useState("");
  const [recipeDatas, setRecipeDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(searchInputText);

  const baseUrl = "https://recipe-app-api-7eo6.onrender.com/api/v1"


  useLayoutEffect(() => {
    const getAllRecipe = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/recommendation`);
        const data = await res.json();
        setRecipeDatas(data.result)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }

    }
    getAllRecipe();
  }, [])

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.categoryContainer, { backgroundColor: category === item.name ? "#36BD69" : "white", },]} onPress={() => setCategory(item.name)}>
        <MyText text={item.name} style={[styles.categoryText, { color: category === item.name ? "white" : "gray" }]} />
      </TouchableOpacity>
    )
  }
  const renderRecipeCard = ({ item }) => <RecipeCard key={item.id} recipeData={item} navigation={navigation} />
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MyText text={"Find Best Recipe For Cooking."} style={[headingText, styles.title]} />
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={24} color="#bdbdbd" />
          <TextInput style={styles.searchInput} placeholder='Search Recipe' onChangeText={(value) => setSearchInputText(value)} placeholderTextColor={"#bdbdbd"} />
        </View>
        <FlatList data={categories} renderItem={renderCategory} horizontal contentContainerStyle={{ marginTop: 10, }} showsHorizontalScrollIndicator={false} keyExtractor={({ item, index }) => item || Math.random()} />
        {
          isLoading && recipeDatas === null ? <ActivityIndicator size={'large'} color={"green"} /> : <FlatList data={recipeDatas} renderItem={renderRecipeCard} contentContainerStyle={{ marginTop: 10, }} showsVerticalScrollIndicator={false} keyExtractor={({ item, index }) => item || Math.random()} />
        }

      </View>

    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: "#fbfcfe",
    paddingHorizontal: 15,
  },
  title: {
    color: "#0d0b10",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "white",
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
    color: "#bdbdbd"
  },



})