import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import {NavigationButton} from '_components/ui/buttons'
import React from 'react'
import {View} from 'react-native'
import {Phrase} from './Phrase'

export default {
  component: Phrase,
} as ComponentMeta<typeof Phrase>

export const Default: ComponentStoryObj<typeof Phrase> = {
  args: {
    children: 'Phrase content',
    fontWeight: 'regular',
    variant: 'body',
  },
}

export const Pattern: ComponentStory<typeof NavigationButton> = () => (
  <View>
    <Phrase variant="small" fontWeight="bold">
      14
    </Phrase>
    <Phrase variant="small">volgers</Phrase>
  </View>
)
