import React from 'react'
import {Box, Text} from '../../ui'
import {Column} from '../../ui/layout'
import mock from './mock.json'
import {Module} from './'

const modules: Module[] = mock.modules.filter(m => m.status === 1)

export const Modules = () => (
  <Column gutter="md">
    {modules.map(module => (
      <Box insetVertical="sm" key={module.title}>
        <Text>{module.title}</Text>
      </Box>
    ))}
  </Column>
)
