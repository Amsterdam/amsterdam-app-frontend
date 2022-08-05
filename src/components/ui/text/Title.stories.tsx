import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Title} from './Title'

export default {
  component: Title,
} as ComponentMeta<typeof Title>

export const Default: ComponentStory<typeof Title> = args => <Title {...args} />
Default.args = {
  color: 'default',
  level: 'h1',
  text: 'Jouw typograaf biedt mij zulke exquise schreven!',
  weight: 'bold',
}
