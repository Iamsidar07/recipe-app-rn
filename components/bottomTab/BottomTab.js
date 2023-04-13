import { StyleSheet,  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons';
import MyText from '../../MyText';
import { boxShadow } from '../../constants';

const BottomTab = ({ navigation }) => {
  return (
    <View style={[styles.container,boxShadow]}>
      <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("HomeScreen")}>
        <Entypo name="home" size={24} color="black" />
        <MyText text={"Home"} style={{ fontSize: 16, color: "#a6a6a6" }} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("HomeScreen")}>
        <Fontisto name="favorite" size={24} color="#dfdfdf" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("FindRecipeFromIngredientsScreen")}>
        <Ionicons name="ios-fast-food" size={24} color="#dfdfdf" />
        <MyText text={"Don't know"} style={{ fontSize: 16, color: "#a6a6a6" }} />
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#ffffff",
    paddingVertical:15,
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    flexDirection:"row",
    alignItems:"center",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    justifyContent:"space-around",
  },
  iconContainer:{
    alignItems:"center",
    justifyContent:"center",
  },

})