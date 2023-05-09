import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyText from '../MyText'
import { headingText } from '../constants'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants';
const WelcomeScreen = ({ navigation }) => {
  return (

    <SafeAreaView style={styles.container}>

      <Image source={require("../assets/app-illustration.png")} style={{ width: "100%", height: 300, flex: 1 }} resizeMode='contain' />
      <View style={styles.introContainer}>
        <MyText text={"Cooking  Experience"} style={[headingText, styles.introTitle]} />
        <MyText text={"Like a Chef."} style={[headingText, styles.introTitle]} />
        <TouchableOpacity style={styles.getStartedBtnContainer} onPress={() => navigation.navigate("HomeScreen")}>
          <View style={styles.getStartedBtnIconContainer}>
            <FontAwesome name="arrow-right" size={24} color={colors.secondaryColor} />
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
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.backgroundColor,
  },

  introContainer: {
    marginBottom: 20,
  },
  introTitle: {
    textAlign: "center",
    fontFamily: "Sen-Bold",
    color:colors.primaryColor,
    fontSize: 48,
  },

  getStartedBtnContainer: {
    flexDirection: "row",
    backgroundColor: colors.primaryColor,
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
    backgroundColor: colors.backgroundColor,
    borderRadius: 50,
  },
  getStartedBtnText: {
    color: "white",
    marginLeft: 15,
    marginRight: "15%",
    fontFamily: "Sen-Bold",

  }


})