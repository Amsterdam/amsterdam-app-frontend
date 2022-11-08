import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {List} from './List'

export default {
  component: List,
} as ComponentMeta<typeof List>

export const Default: ComponentStory<typeof List> = args => <List {...args} />
Default.args = {
  items: [
    'Centrum',
    'Nieuw-West',
    'Noord',
    'Oost',
    'West',
    'Zuid',
    'Zuidoost',
    'Weesp',
  ],
  marker: 'square',
}
