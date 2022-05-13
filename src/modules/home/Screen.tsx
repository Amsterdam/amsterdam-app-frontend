import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../app/navigation'
import {Modules} from '../../components/features/modules'
import {AddButton, Box} from '../../components/ui'
import {Column, Gutter} from '../../components/ui/layout'
import {module as settingsModule} from '../../modules/settings'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Column align="between">
      <Modules />
      <Box>
        <AddButton onPress={() => navigation.navigate(settingsModule.name)} />
        <Gutter height="lg" />
      </Box>
    </Column>
  )
}
