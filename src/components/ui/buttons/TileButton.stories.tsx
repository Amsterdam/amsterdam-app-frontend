import {Story} from '@storybook/react'
import React from 'react'
import {TileButton, TileButtonProps} from './TileButton'
import {Row} from '@/components/ui/layout'

export default {
  component: TileButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
}

const Template: Story<TileButtonProps> = args => (
  <Row align="start">
    <TileButton {...args} />
  </Row>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
}
