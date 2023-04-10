import { ActivityIndicator, Alert, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories } from '../constants'
import { AntDesign } from '@expo/vector-icons';
import { RecipeCard, BottomTab } from "../components";


const HomeScreen = ({ navigation }) => {
  const [searchInputText, setSearchInputText] = useState("all");
  const [category, setCategory] = useState("all");
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

      <ScrollView contentContainerStyle={{ padding: 5, }} showsVerticalScrollIndicator={false}>
        <View style={styles.homeHeaderContainer}>
          <View>
            <MyText text={"Hello, Manoj"} style={styles.homeHeaderGreetText} />
            <MyText text={"What would to you like"} style={styles.homeHeaderNormalText} />
            <MyText text={"to cook today?"} style={styles.homeHeaderNormalText} />
          </View>
          <View>
            <Image source={require("../assets/girl.png")} style={styles.userAvatar} resizeMode='contain' />
          </View>
        </View>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={24} color="#bdbdbd" />
          <TextInput style={styles.searchInput} placeholder='Search Recipe' onChangeText={(value) => setSearchInputText(value)} placeholderTextColor={"#bdbdbd"} />
        </View>
        <FlatList data={categories} renderItem={renderCategory} horizontal contentContainerStyle={{marginVertical:20,}} showsHorizontalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />
        
        {
          (isLoading && (recipeDatas === null)) ?
            <View style={styles.loader}>
                <Image source={require("../assets/1.gif")} style={{ width: 70, height: 70 }} resizeMode='contain'/>
            </View>
            : <FlatList data={recipeDatas} renderItem={renderRecipeCard} contentContainerStyle={{ gap: 5, paddingBottom: "35%", }} showsVerticalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />
        }

      </ScrollView>

      <BottomTab navigation={navigation} />
    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight +5,
    paddingHorizontal: 10,
  },
  homeHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  homeHeaderGreetText: {
    color: "#a6a6a6",
    marginBottom:5,
  },
  homeHeaderNormalText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  userAvatar: {
    borderRadius: 50,
    backgroundColor: "#b3d2c5",
    width: 50,
    height: 50,
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:10,
  },

  title: {
    color: "#0d0b10",
    fontSize: 28,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    paddingVertical:12,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#ffffff",
    color: "#bdbdbd",
    fontFamily: "Poppins-Regular"
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