import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { boxShadow, colors, headingText } from '../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { Seperator } from '../components'

const InstructionScreen = ({ navigation }) => {
    const [isDone, setIsDone] = useState(false);
    const [whichStepDone, setWhichStepDone] = useState(null);
    const route = useRoute();
    const { recipeData } = route.params;


    const handleDoneBtnPress = () => {
        navigation.navigate("HomeScreen")
    }

    const renderIngredientItem = ({ item, index }) => {
        return <View style={[styles.stepItemContainer, boxShadow]} >
            <View style={styles.stepNumberContainer}>
                <MyText text={index + 1} style={styles.stepNumber} />
            </View>
            <MyText text={item} style={styles.instructionText} />
        </View>
    }
    return (
        <SafeAreaView style={[styles.container, boxShadow]}>
            <View style={[styles.headerContainer, boxShadow]}>
                <TouchableOpacity style={[styles.backIcon, boxShadow]} onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={16} color={colors.secondaryColor} />
                </TouchableOpacity>
                <MyText text={recipeData.title.length >= 20 ? `${recipeData.title.slice(0, 20)}...` : recipeData.title} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
            </View>
            <Seperator />

            <MyText text={"🍜Instruction:"} style={styles.description} />

            <FlatList data={recipeData["direction"||"directions"]} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%", padding: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
            <Pressable style={styles.startCookBtnContainer} onPress={handleDoneBtnPress}>
                <MyText text={"Done !"} style={styles.startCookBtnText} />
                <Ionicons name="checkmark-done" size={24} color="#e3e3e3" style={styles.startCookBtnText} />
            </Pressable>

        </SafeAreaView>

    )
}

export default InstructionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 20,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        marginBottom: 15,
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
    description: {
        fontFamily: "Sen-Regular",
        fontSize: 20,
        marginTop: 10,
        padding:10,
        color: colors.primaryColor,
    },
    stepItemContainer: {
        padding: 10,
        backgroundColor: "#ffffff",
        marginTop: 10,
        borderRadius: 10,
        position:"relative",
    },
    stepNumberContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor:colors.accentColor,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 5,
        top: 5,
    },
    stepNumber: {
        color: "white",
        fontFamily: "Sen-Bold",
    },
    instructionText: {
        marginTop: 50,
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
    congratulationGif: {
        width: 200,
        height: 200,
        // position: "absolute",
        // bottom: 0,
        // left: 0,
    }





})