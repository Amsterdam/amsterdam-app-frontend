import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../App'
import {Text} from '../components/ui'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({route}: Props) => {
  return <Text>Project detail page for ‘{route.params.id}’.</Text>
}
