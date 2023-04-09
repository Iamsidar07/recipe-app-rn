import { View, Text } from 'react-native'
import React from 'react'

const MyText = ({style,text,...otherProps}) => {

  return (
    <Text style={[{ fontFamily: "GoogleSans-Regular",fontSize:16,color:"black" },style, ]} {...otherProps}>{text}</Text>
  )
}

export default MyText