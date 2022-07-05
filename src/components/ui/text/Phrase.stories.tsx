import {Meta, Story} from '@storybook/react'
import React from 'react'
import {View} from 'react-native'
import {Phrase, PhraseProps} from './Phrase'

export default {
  component: Phrase,
} as Meta

const Template: Story<PhraseProps> = args => (
  <Phrase {...args}>Phrase content</Phrase>
)

export const Default = Template.bind({})

Default.args = {
  fontWeight: 'regular',
  variant: 'body',
}
export const Pattern = () => (
  <View>
    <Phrase variant="small" fontWeight="bold">
      14
    </Phrase>
    <Phrase variant="small">volgers</Phrase>
  </View>
)
