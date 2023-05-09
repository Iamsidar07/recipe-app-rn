import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { boxShadow, colors } from '../constants'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Seperator } from "../components";
import { useRoute } from '@react-navigation/native'

const RecipeDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { recipeData } = route.params;
    console.log({recipeData})
    let difficultyLevelBg;
    const difficultyLevel = recipeData?.difficulty.toLowerCase();
    if (difficultyLevel === "easy") {
        difficultyLevelBg = "green";
    } else if (difficultyLevel === "Bold") {
        difficultyLevelBg = "orange"
    } else {
        difficultyLevelBg = "red";
    }
    const renderIngredientItem = ({ item }) => {
        return <View style={[styles.ingredientItemContainer, boxShadow]}>
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

            <View style={styles.headerContainer}>
                <TouchableOpacity style={[styles.backIcon, boxShadow]} onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={16} color={colors.secondaryColor} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.favIcon, boxShadow]} >
                    <MaterialIcons name="favorite-border" size={20} color={colors.secondaryColor} />
                </TouchableOpacity>
            </View>
            <Seperator />
            
            <ScrollView showsVerticalScrollIndicator={false} >
                <Image source={{ uri: recipeData.recipeImageUrl }} style={styles.image} resizeMode='cover' />

                <ScrollView contentContainerStyle={[{ paddingHorizontal: 10, marginTop: 7, paddingTop: 12 }, boxShadow]}>
                    <MyText text={recipeData.title} style={styles.title} />

                    <View style={styles.info}>
                        <View style={styles.infoContainer}>
                            <MyText text={"⚡"} style={{ fontSize: 25, marginBottom: 3, }} />
                            <MyText text={`${recipeData.difficulty[0].toUpperCase()}${recipeData.difficulty.slice(1)}`} style={{ color: "#52c779" }} />
                        </View>
                        <View style={[styles.infoContainer, { backgroundColor: "#fff9e9" }]}>
                            <MyText text={"⏳"} style={{ fontSize: 25, marginBottom: 3, }} />
                            <MyText text={recipeData.time.slice(0, 6)} style={{ color: "#ecb82f" }} />
                        </View>
                        <View style={[styles.infoContainer, { backgroundColor: "#f1effc" }]}>
                            <MyText text={"🤼"} style={{ fontSize: 25, marginBottom: 3, }} />
                            <MyText text={`${recipeData.serving}`} style={{ color: "#7664de" }} />
                        </View>

                    </View>
                    <MyText text={"Description"} style={{ fontSize: 20, marginBottom: 10, fontFamily: "Sen-Bold", }} />
                    <MyText text={recipeData.description} style={styles.description} />

                    <View style={styles.ingredientsAndServingBtnContainer}>
                        <MyText text={`Ingredients (${recipeData.ingredients?.length})`} style={styles.ingredientsText} />
                    </View>
                    <FlatList data={recipeData.ingredients} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || index || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={[{ paddingBottom: "65%", paddingVertical: 5, }, boxShadow]} />
                </ScrollView>
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
        backgroundColor: colors.backgroundColor,
        paddingTop: Constants.statusBarHeight + 10,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 7,
        marginBottom: 7,
    },
    backIcon: {
        backgroundColor: "#ffffff",
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    favIcon: {
        backgroundColor: "#ffffff",
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",

    },
    image: {
        width: "95%",
        height: 200,
        opacity: 0.8,
        marginHorizontal: 7,
        borderRadius: 10,
        marginTop: 10,
    },
    title: {
        color: "#0d0b10",
        fontSize: 25,
        fontFamily: "Sen-Bold",
        marginBottom: 5,
    },
    description: {
        marginTop: 4,
        color: "#a6a6a6",
    },
    infoContainer: {
        alignItems: "center",
        backgroundColor: "#eefbf2",
        width: "30%",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e9efe6",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 1,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 7,
        marginBottom: 30,

    },
    ingredientsAndServingBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        marginVertical: 10,
    },
    ingredientsText: {
        color: "#111742",
        fontSize: 20,
        fontFamily: "Sen-Bold",
    },
    servingBtnContainer: {
        // backgroundColor: "#24BC66",
        // paddingHorizontal: 25,
        // paddingVertical: 15,
        // borderRadius: 40,
    },
    ingredientItemContainer: {
        padding: 7,
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
    ingredientImageContainer: {
        backgroundColor: "#dededf",
        width: 60,
        height: 60,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    ingredientImage: {
        fontSize: 20,
    },
    startCookBtnContainer: {
        backgroundColor: colors.primaryColor,
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