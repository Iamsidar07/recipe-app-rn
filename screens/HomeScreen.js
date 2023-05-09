import { ActivityIndicator, Alert, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories, colors } from '../constants'
import { AntDesign } from '@expo/vector-icons';
import { RecipeCard, BottomTab, Seperator } from "../components";
import { boxShadow } from '../constants'
import Lottie from "lottie-react-native";


const HomeScreen = ({ navigation }) => {
  const [searchInputText, setSearchInputText] = useState("");
  const [category, setCategory] = useState("all");
  const [recipeDatas, setRecipeDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
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
      <Pressable style={[styles.categoryContainer, { backgroundColor: searchInputText.toLocaleLowerCase() === item.name.toLocaleLowerCase() ? "#0e0e0e" : "#ffffff", }, boxShadow]} onPress={() => setSearchInputText(item.name.slice(3))}>
        <MyText text={item.name} style={[styles.categoryText, { color: searchInputText.toLocaleLowerCase() === item.name.toLocaleLowerCase() ? "white" : "gray" }]} />
      </Pressable>
    )
  }
  const renderRecipeCard = ({ item }) => <RecipeCard key={item.id} recipeData={item} navigation={navigation} />

  const handleSearchChange = (value) => {
    clearTimeout(searchTimeout);
    setSearchInputText(value);
    setSearchTimeout(setTimeout(() => {
      const searchResults = recipeDatas.filter((recipeData) => recipeData.title.toLowerCase().includes(searchInputText.toLowerCase()) || recipeData.category.toLowerCase().includes(searchInputText.toLowerCase()) || recipeData.description.toLowerCase().includes(searchInputText.toLowerCase()));
      setSearchResults(searchResults);
    }, 500))
  }


  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeHeaderContainer}>
          <MyText text={"Hello 👋, "} style={styles.homeHeaderGreetText} />
          <View style={boxShadow}>
            <Image source={require("../assets/girl.png")} style={styles.userAvatar} resizeMode='contain' />
          </View>
        </View>
        <Seperator />
        <View style={styles.description}>
          <MyText text={"What would to you like"} style={styles.homeHeaderNormalText} />
          <MyText text={"to cook today?"} style={styles.homeHeaderNormalText} />
        </View>
        <View style={[styles.searchInputContainer, boxShadow]}>
          <AntDesign name="search1" size={24} color="#bdbdbd" />
          <TextInput style={styles.searchInput} placeholder='Search Recipe' onChangeText={handleSearchChange} value={searchInputText} placeholderTextColor={"#bdbdbd"} />
        </View>
        {
          searchInputText && <MyText text={`Showing search result for ${searchInputText}`} style={{ fontSize: 15, marginVertical: 7, marginLeft: 10, }} />
        }

        <FlatList data={categories} renderItem={renderCategory} horizontal contentContainerStyle={{ marginTop: 5, marginBottom: 10, paddingVertical: 2, }} showsHorizontalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />

        {
          (isLoading && (recipeDatas === null)) ? <View style={styles.loader}>
            <Lottie source={require("../assets/spoonLoader.json")} autoPlay style={{ width: 70, }} loop />
          </View>
            : <View>
              <MyText text={"Recommended"} style={{ marginBottom: 9, marginLeft: 10, fontSize: 18, fontWeight: "600" }} />
              <FlatList data={searchInputText ? searchResults : recipeDatas} renderItem={renderRecipeCard} contentContainerStyle={{ gap: 10, paddingBottom: "35%", paddingHorizontal: 7, }} showsVerticalScrollIndicator={false} keyExtractor={({ item, index }) => item?._id || Math.random()} />
            </View>
        }
      </ScrollView>
      <Seperator />
      <BottomTab navigation={navigation} />
    </SafeAreaView>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: colors.backgroundColor
  },
  homeHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  homeHeaderGreetText: {
    color: "#a6a6a6",
    marginBottom: 5,
    fontSize: 20
  },
  homeHeaderNormalText: {
    fontSize: 23,
    fontFamily: "Sen-Bold",
    maxWidth: "80%",
  },
  userAvatar: {
    borderRadius: 50,
    backgroundColor: colors.primaryColor,
    width: 50,
    height: 50,
  },
  description: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    paddingVertical: 12,
    marginHorizontal: 7,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#ffffff",
    height: "100%",
    fontFamily: "Sen-Regular"
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 7,
    marginHorizontal: 7,
  },

})