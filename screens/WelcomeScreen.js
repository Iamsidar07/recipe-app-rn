import { Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants"
import MyText from '../MyText'
import { headingText } from '../constants'
import { FontAwesome } from '@expo/vector-icons';
const WelcomeScreen = ({ navigation }) => {
  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/welcomeBg.jpg")} style={StyleSheet.absoluteFill} resizeMode='cover' blurRadius={10} />
      <Image source={require("../assets/girl.png")} style={{ width: "100%", height: 400 }} resizeMode='cover' /> 
      <View style={styles.introContainer}>
        <MyText text={"Cooking  Experience"} style={[headingText, styles.introTitle]} />
        <MyText text={"Like a Chef."} style={[headingText, styles.introTitle]} />
        <MyText text={"Let's make a delicious dish with the best recipe for the family."} style={styles.introDescription} />
        <TouchableOpacity style={styles.getStartedBtnContainer} onPress={()=>navigation.navigate("HomeScreen")}>
          <View style={styles.getStartedBtnIconContainer}>
            <FontAwesome name="arrow-right" size={24} color="#36BD69" />
          </View>
          <MyText text={"Get Started"} style={styles.getStartedBtnText} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  introContainer: {
  //  marginBottom:"25%",
  marginBottom:20,
  },
  introTitle: {
    textAlign: "center",
    fontFamily: "Karla-SemiBold",
    color:"white",
    fontSize:28,
  },
  introDescription: {
    textAlign: "center",
    marginTop: 10,
    maxWidth: "90%",
    color: "#dbdbdb"
  },
  getStartedBtnContainer: {
    flexDirection: "row",
    backgroundColor: "#24BC66",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    alignSelf:"center",
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
    fontFamily: "Karla-SemiBold",

  }


})