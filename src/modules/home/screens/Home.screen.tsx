import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {AddButton, Box} from '../../../components/ui'
import {Column, Gutter} from '../../../components/ui/layout'
import {Modules} from '../components'
import {HomeRouteName, HomeStackParams} from '../routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

  return (
    <Column align="between">
      <Modules />
      <EnvironmentSelector />
      <Box>
        <AddButton
          onPress={() => navigation.navigate(HomeRouteName.settings)}
        />
        <Gutter height="lg" />
      </Box>
    </Column>
  )
}
