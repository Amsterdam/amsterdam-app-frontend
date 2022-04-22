import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Pressable} from 'react-native'
import {routes} from '../../../modules/waste-guide/routes'
import {Box, Text} from '../../ui'
import {Column} from '../../ui/layout'
import mock from './mock.json'
import {Module, WasteGuideModuleStackParams} from './'

const modules: Module[] = mock.modules.filter(m => m.status === 1)

export const Modules = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideModuleStackParams, 'WasteGuideModule'>
    >()

  return (
    <Column gutter="md">
      {modules.map(module => {
        if (module.slug === 'waste-guide') {
          return (
            <Pressable
              key={module.title}
              onPress={() => navigation.navigate(routes.wasteGuideModule.name)}>
              <Box insetVertical="sm" key={module.title}>
                <Text>{module.title}!</Text>
              </Box>
            </Pressable>
          )
        }
        return (
          <Box insetVertical="sm" key={module.title}>
            <Text>{module.title}</Text>
          </Box>
        )
      })}
    </Column>
  )
}
