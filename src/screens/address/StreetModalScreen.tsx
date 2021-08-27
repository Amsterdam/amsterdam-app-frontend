import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../App'
import {ScreenWrapper, Text} from '../../components/ui'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'StreetModal'>
}

export const StreetModalScreen = ({navigation}: Props) => {
  console.log({navigation})
  return (
    <ScreenWrapper>
      <Text>Street Modal</Text>
    </ScreenWrapper>
  )
}
