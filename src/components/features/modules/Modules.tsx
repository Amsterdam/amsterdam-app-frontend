import {useLinkTo} from '@react-navigation/native'
import React from 'react'
import {Pressable} from 'react-native'
import {Box, Text} from '../../ui'
import {Column} from '../../ui/layout'
import mock from './mock.json'
import {Module} from './'

const modules: Module[] = mock.modules.filter(m => m.status === 1)

export const Modules = () => {
  const linkTo = useLinkTo()

  return (
    <Column gutter="md">
      {modules.map(module => {
        if (module.slug === 'waste-guide') {
          return (
            <Pressable
              key={module.title}
              onPress={() => linkTo(`/${module.slug}`)}>
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
