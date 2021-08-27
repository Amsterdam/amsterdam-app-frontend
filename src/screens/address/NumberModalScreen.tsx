import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../App'
import {ScreenWrapper, Text} from '../../components/ui'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'NumberModal'>
  route: RouteProp<RootStackParamList, 'NumberModal'>
}

export const NumberModalScreen = ({route}: Props) => {
  const {street} = route.params
  console.log({street})
  return (
    <ScreenWrapper>
      <Text>Street Modal</Text>
    </ScreenWrapper>
  )
}
