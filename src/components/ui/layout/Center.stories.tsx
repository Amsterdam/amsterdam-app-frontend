import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Center} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'

export default {
  component: Center,
} as ComponentMeta<typeof Center>

export const Default: ComponentStoryObj<typeof Center> = {
  args: {
    children: <Phrase>Ik sta in het midden</Phrase>,
  },
}
