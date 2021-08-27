import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../App'
import {ScreenWrapper, Text} from '../components/ui'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateAddress'>
  route: RouteProp<RootStackParamList, 'CreateAddress'>
}

export const CreateAddressScreen = ({route}: Props) => {
  return (
    <ScreenWrapper>
      {route.params?.street ? (
        <Text>Create Number</Text>
      ) : (
        <Text>Create Street</Text>
      )}
    </ScreenWrapper>
  )
}
