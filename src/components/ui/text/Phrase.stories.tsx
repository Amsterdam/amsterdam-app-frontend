import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import React from 'react'
import {View} from 'react-native'
import {Phrase} from './Phrase'

export default {
  component: Phrase,
} as ComponentMeta<typeof Phrase>

export const Default: ComponentStoryObj<typeof Phrase> = {
  args: {
    children: 'Phrase content',
    color: 'default',
    fontWeight: 'normal',
    variant: 'body',
  },
}

export const Pattern: ComponentStory<typeof Phrase> = () => (
  <View>
    <Phrase fontWeight="normal" variant="small">
      14
    </Phrase>
    <Phrase variant="small">volgers</Phrase>
  </View>
)
