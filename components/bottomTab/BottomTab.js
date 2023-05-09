import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome} from '@expo/vector-icons';
import { boxShadow, colors } from '../../constants';

const BottomTab = ({ navigation }) => {
  return (
    <View style={[styles.container, boxShadow]}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("HomeScreen")}>
        <AntDesign name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("FindRecipeFromIngredientsScreen")}>
        <AntDesign name="pluscircleo" size={32} color={colors.primaryColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("HomeScreen")}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("HomeScreen")}>
        <FontAwesome name="bookmark-o" size={24} color="black" />
      </TouchableOpacity>

    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal:20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

})