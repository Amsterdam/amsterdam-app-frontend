import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Center, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'

export default {
  component: Center,
  decorators: [Story => <Row>{Story()}</Row>],
} as ComponentMeta<typeof Center>

export const Default: ComponentStoryObj<typeof Center> = {
  args: {
    grow: true,
    children: <Phrase>Ik sta in het midden</Phrase>,
  },
}
