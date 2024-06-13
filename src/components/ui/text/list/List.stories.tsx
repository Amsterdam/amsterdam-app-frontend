import {Meta, StoryFn} from '@storybook/react'
import {List} from './List'

export default {
  component: List,
} as Meta<typeof List>

export const Default: StoryFn<typeof List> = args => <List {...args} />
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
