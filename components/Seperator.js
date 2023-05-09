import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants'

const Seperator = () => {
  return (
    <View style={styles.seperator}></View>
  )
}

export default Seperator

const styles = StyleSheet.create({
    seperator:{
        backgroundColor:"white",
        height:1,
        width:"100%",
    }
})