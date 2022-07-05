import {Story} from '@storybook/react'
import React from 'react'
import {EmptyMessage, EmptyMessageProps} from './EmptyMessage'

export default {
  component: EmptyMessage,
}

const Template: Story<EmptyMessageProps> = args => <EmptyMessage {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'We hebben geen werkzaamheden gevonden voor dit adres.',
}
