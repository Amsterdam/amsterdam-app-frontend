import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootProvider} from '../src/providers'
import './preview.css'
import {baseColor} from '@/tokens'

export const parameters = {
  backgrounds: {
    values: [
      {
        name: 'primary-blue',
        value: baseColor.primary.blue,
      },
      {
        name: 'primary-red',
        value: baseColor.primary.red,
      },
      {
        name: 'primary-black',
        value: baseColor.primary.black,
      },
      {
        name: 'secondary-yellow',
        value: baseColor.secondary.yellow,
      },
      {
        name: 'secondary-purple',
        value: baseColor.secondary.purple,
      },
    ],
  },
  controls: {expanded: true},
}

export const decorators = [
  Story => (
    <SafeAreaProvider>
      <RootProvider>
        <Story />
      </RootProvider>
    </SafeAreaProvider>
  ),
]
