import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {AddButton, Box} from '../../../components/ui'
import {Column, Gutter} from '../../../components/ui/layout'
import {module as settingsModule} from '../../settings'
import {Modules} from '../components'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Column align="between">
      <Modules />
      <EnvironmentSelector />
      <Box>
        <AddButton onPress={() => navigation.navigate(settingsModule.name)} />
        <Gutter height="lg" />
      </Box>
    </Column>
  )
}
