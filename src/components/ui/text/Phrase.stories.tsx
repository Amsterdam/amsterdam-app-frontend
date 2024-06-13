import {Meta, StoryFn, StoryObj} from '@storybook/react'
import {View} from 'react-native'
import {Phrase} from './Phrase'

export default {
  component: Phrase,
} as Meta<typeof Phrase>

export const Default: StoryObj<typeof Phrase> = {
  args: {
    children: 'Phrase content',
    color: 'default',
    emphasis: 'default',
    variant: 'body',
  },
}

export const Pattern: StoryFn<typeof Phrase> = () => (
  <View>
    <Phrase
      emphasis="strong"
      testID="Phrase"
      variant="small">
      14
    </Phrase>
    <Phrase
      testID="Phrase"
      variant="small">
      volgers
    </Phrase>
  </View>
)
