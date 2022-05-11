import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Pressable} from 'react-native'
import {RootStackParamList} from '../../../app/navigation/RootStackNavigator'
import {modules} from '../../../modules'
import {Box, Text} from '../../ui'
import {Column} from '../../ui/layout'

const modulesExceptHome = modules.filter(
  module =>
    module.name !== 'HomeModule' &&
    module.name !== 'UserModule' &&
    module.name !== 'SettingsModule',
)

export const Modules = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Column gutter="md">
      {modulesExceptHome.map(module => (
        <Pressable
          key={module.name}
          onPress={() => navigation.navigate(module.name)}>
          <Box insetVertical="sm" key={module.name}>
            <Text>{module.title}</Text>
          </Box>
        </Pressable>
      ))}
    </Column>
  )
}
