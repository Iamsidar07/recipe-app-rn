import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories } from '../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { RecipeCard } from "../components";
import { useRoute } from '@react-navigation/native'

const RecipeDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { recipeData } = route.params;

    let difficultyLevelBg;
    const difficultyLevel=recipeData.difficulty.toLowerCase();
    if (difficultyLevel === "easy") {
        difficultyLevelBg = "green";
    } else if (difficultyLevel === "medium") {
        difficultyLevelBg = "orange"
    } else {
        difficultyLevelBg = "red";
    }
    const renderIngredientItem = ({ item }) => {
        return <View style={styles.ingredientItemContainer}>
            <View style={styles.nameAndImageContainer}>
                <Image source={{ uri: item.ingredientImageUrl }} style={styles.ingredientImage} />
                <MyText text={item.name} style={styles.ingredientName} />
            </View>
            <MyText text={item.quantity} style={styles.ingredientQuantity} />
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back" size={28} color="#bdbdbd" />
                </TouchableOpacity>
                <MyText text={recipeData.title} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
            </View>
            <Image source={{ uri: recipeData.recipeImageUrl || "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} style={styles.image} resizeMode='cover' />

            <MyText text={recipeData.description} style={styles.description} />
            <View style={styles.info}>
                <MyText text={recipeData.category} style={{ fontSize: 14 }} />
                <MyText text={recipeData.difficulty} style={{ fontSize: 14 }} />
                <View style={{ backgroundColor: difficultyLevelBg, width: 10, height: 10, borderRadius: 30 }} />
                <MyText text={recipeData.time} style={{ fontSize: 14 }} />
            </View>

            <View style={styles.ingredientsAndServingBtnContainer}>
                <MyText text={`Ingredients (${recipeData.ingredients?.length})`} style={styles.ingredientsText} />
                <TouchableOpacity style={styles.servingBtnContainer}>
                    <MyText text={`Serving ${recipeData.serving}`} style={{ color: "#e3e3e3" }} />
                </TouchableOpacity>
            </View>
            <FlatList data={recipeData.ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || index || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%" }} />
            <TouchableOpacity style={styles.startCookBtnContainer} onPress={() => navigation.navigate("InstructionScreen", { recipeData })}>
                <MyText text={"Start Cook!"} style={styles.startCookBtnText} />
                <AntDesign name="arrowright" size={24} color="#e3e3e3" style={styles.startCookBtnText} />
            </TouchableOpacity>

        </SafeAreaView>

    )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 5,
        backgroundColor: "#fbfcfe",
        paddingHorizontal: 5,
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
    image: {
        width: "100%",
        height: 200,
        borderRadius:20,
        marginTop: 20,
    },
    description: {
        padding: 5,
    },
    info: {
        flexDirection:"row",
        alignItems:"center",
        padding:5,
        gap:5,
    },
    ingredientsAndServingBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal:10,
        paddingBottom:15,
    },
    ingredientsText: {
        color: "#111742",
    },
    servingBtnContainer: {
        backgroundColor: "#36BD69",
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20,
    },
    ingredientItemContainer: {
        padding: 20,
        backgroundColor: "#f6f8fc",
        marginTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    nameAndImageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ingredientName: {
        color: "#111742",
        marginLeft: 10,
    },
    ingredientQuantity: {

    },
    ingredientImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    startCookBtnContainer: {
        backgroundColor: "#0e0e0e",
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