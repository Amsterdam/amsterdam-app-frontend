import React from 'react'
import {Text, View} from 'react-native'
import {fontSize} from '../../tokens'

const Header = () => {
  return (
    <>
      <View style={{backgroundColor: 'red', padding: 10}}>
        <Text style={{color: 'white', fontSize: fontSize.md}}>
          Gemeente Amsterdam
        </Text>
      </View>
    </>
  )
}

export default Header
