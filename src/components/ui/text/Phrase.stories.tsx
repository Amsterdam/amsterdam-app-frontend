import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import {View} from 'react-native'
import {Phrase} from './Phrase'

export default {
  component: Phrase,
} as ComponentMeta<typeof Phrase>

export const Default: ComponentStoryObj<typeof Phrase> = {
  args: {
    children: 'Phrase content',
    color: 'default',
    emphasis: 'default',
    variant: 'body',
  },
}

export const Pattern: ComponentStory<typeof Phrase> = () => (
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
