import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../App'
import {Button, Title} from '../components/ui'

type ProjectManagerScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectManager'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectManager'>
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => {
  console.log(route.params.id)
  return (
    <>
      <Title text="Gelukt!" />
      <Button text="Aan de slag!" onPress={() => navigation.navigate('Home')} />
    </>
  )
}
