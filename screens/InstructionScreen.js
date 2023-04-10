import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText } from '../constants'
import { Ionicons } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native'

const InstructionScreen = ({ navigation }) => {
    const [isDone, setIsDone] = useState(false);
    const [whichStepDone, setWhichStepDone] = useState(null);
    const route = useRoute();
    const { recipeData } = route.params;


    const handleDoneBtnPress = () => {
        navigation.navigate("HomeScreen")
    }

    const renderIngredientItem = ({ item, index }) => {
        return <View style={styles.stepItemContainer} >
            <View style={styles.stepNumberContainer}>
                <MyText text={index + 1} style={styles.stepNumber} />
            </View>
            <MyText text={item} style={styles.instructionText} />
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()} >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <MyText text={recipeData.title.length >= 20 ? `${recipeData.title.slice(0, 20)}...` : recipeData.title} style={[headingText, styles.title]} allowFontScaling={true} numberOfLines={1} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: "#ffffff",borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop:20,}}>
                <MyText text={"🍜Instruction:"} style={styles.description} />
                {
                    isDone && <Image source={{ uri: "https://png.pngtree.com/png-clipart/20210808/original/pngtree-congratulations-png-vactor-png-image_6617562.jpg" }} style={styles.congratulationGif} resizeMode='cover' />
                }

                <FlatList data={recipeData.direction} renderItem={renderIngredientItem} keyExtractor={({ item, index }) => item || Math.random()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "65%", backgroundColor: "#ffffff", padding: 5, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
            </ScrollView>

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
        paddingTop: Constants.statusBarHeight + 10,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 5,
        paddingHorizontal: 15,
        marginBottom:30,
    },
    backIcon: {
        position: "absolute",
        left: 5,
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#0d0b10",
        fontSize: 20,
    },
    description: {
        fontFamily: "Raleway-Regular",
        fontSize: 20,
        marginTop:30,
        padding:10,
    },
    stepItemContainer: {
        padding: 15,
        backgroundColor: "#ffffff",
        marginTop: 10,
        borderRadius: 10,
    },
    stepNumberContainer: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: "#24BC66",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 5,
        top: 5,
    },
    stepNumber: {
        color: "white",
        fontFamily: "Raleway-Medium",
    },
    instructionText: {
        marginTop: 50,
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
    congratulationGif: {
        width: 200,
        height: 200,
        // position: "absolute",
        // bottom: 0,
        // left: 0,
    }





})