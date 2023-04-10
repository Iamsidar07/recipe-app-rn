import { ImageBackground, SafeAreaView, StyleSheet, } from 'react-native'
import React from 'react'
import Constants from "expo-constants"

const CongratulationScreen = ({ navigation }) => {
    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/congratulation.gif")} style={StyleSheet.absoluteFillObject} resizeMode='cover' blurRadius={0} />
            

        </SafeAreaView>

    )
}

export default CongratulationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 5,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    introContainer: {
        marginBottom: "25%",
    },
    introTitle: {
        textAlign: "center",
        fontFamily: "Manrope-SemiBold",
    },
    introDescription: {
        textAlign: "center",
        marginTop: 10,
        maxWidth: "90%",
        color: "#dbdbdb"
    },
    getStartedBtnContainer: {
        flexDirection: "row",
        backgroundColor: "#36BD69",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 50,
        alignSelf: "center",
    },
    getStartedBtnIconContainer: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 50,
    },
    getStartedBtnText: {
        color: "white",
        marginLeft: 15,
        marginRight: "15%",
        fontFamily: "Manrope-SemiBold",

    }


})