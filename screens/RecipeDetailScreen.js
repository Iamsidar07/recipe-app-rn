import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText, categories } from '../constants'
import { Ionicons, AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { RecipeCard } from "../components";
import { useRoute } from '@react-navigation/native'

const RecipeDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { recipeData } = route.params;
    console.log(recipeData)
    let difficultyLevelBg;
    const difficultyLevel = recipeData?.difficulty.toLowerCase();
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
                <View style={styles.ingredientImageContainer}>
                    <MyText text={item.ingredientEmoji} style={styles.ingredientImage} />
                </View>
                <MyText text={item.name} style={styles.ingredientName} />
            </View>
            <MyText text={item.quantity} style={styles.ingredientQuantity} />
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: recipeData.recipeImageUrl }} style={StyleSheet.absoluteFillObject} resizeMode='cover' />
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.backIcon} >
                    <MaterialIcons name="favorite-border" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: "#ffffff", paddingHorizontal: 20, paddingVertical: 50, borderTopLeftRadius: 30, borderTopRightRadius: 30,maxHeight:"70%"}}>
                <MyText text={recipeData.title} style={styles.title} />
               
                <View style={styles.info}>
                    <MyText text={recipeData.category} style={{ fontSize: 16 }} />
                    <View style={styles.infoContainer}>
                        <AntDesign name="barschart" size={20} color="#a6a6a6" />
                        <MyText text={recipeData.difficulty} style={{ fontSize: 16 }} />
                    </View>
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="access-time" size={20} color="#a6a6a6" />
                        <MyText text={recipeData.time} style={{ fontSize: 16 }} />
                    </View>
                    <MyText text={`${recipeData.serving} Serving `} style={{ fontSize: 16 }} />

                </View>
                <MyText text={"Description"} style={{ fontSize: 20, marginBottom: 10, fontFamily: "Raleway-Medium", }}/>
                <MyText text={recipeData.description} style={styles.description} />

                <View style={styles.ingredientsAndServingBtnContainer}>
                    <MyText text={`Ingredients (${recipeData.ingredients?.length})`} style={styles.ingredientsText} />
                </View>
                <FlatList data={recipeData.ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || index || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%" }} />
            </ScrollView>
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
        paddingTop: Constants.statusBarHeight ,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop:5,
        paddingHorizontal: 15,
        marginBottom: "50%"
    },
    backIcon: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#0d0b10",
        fontSize: 25,
        fontFamily: "Raleway-Medium",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: "#614b3d"
    },
    description: {
        marginTop: 4,
        color:"#a6a6a6",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
        gap: 5,
        marginBottom:30,
    },
    ingredientsAndServingBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        marginVertical:10,
    },
    ingredientsText: {
        color: "#111742",
        fontSize:20,
        fontFamily: "Raleway-Medium",
    },
    servingBtnContainer: {
        // backgroundColor: "#24BC66",
        // paddingHorizontal: 25,
        // paddingVertical: 15,
        // borderRadius: 40,
    },
    ingredientItemContainer: {
        // padding: 20,
        backgroundColor: "#ffffff",
        marginTop: 15,
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
    ingredientImageContainer:{
        backgroundColor: "#dededf",
        width: 60,
        height: 60,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
    },
    ingredientImage: {
        fontSize: 20,
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
        fontFamily: "Raleway-Medium",
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },



})