import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootProvider} from '../src/providers'
import './preview.css'

export const parameters = {
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
