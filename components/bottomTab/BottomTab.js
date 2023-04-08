import { StyleSheet,  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons';


const BottomTab = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("HomeScreen")}>
        <Entypo name="home" size={24} color="black" />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("HomeScreen")}>
        <Fontisto name="favorite" size={24} color="#dfdfdf" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("FindRecipeFromIngredientsScreen")}>
        <Ionicons name="ios-fast-food" size={24} color="#dfdfdf" />
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fefeff",
    padding:10,
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
  },
  iconContainer:{
    width:40,
    height:40,
    borderRadius:10,
  },

})