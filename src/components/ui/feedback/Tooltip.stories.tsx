import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Tooltip} from './Tooltip'
import {MaxWidth} from '@/../.storybook/components/MaxWidth'

export default {
  component: Tooltip,
  decorators: [Story => <MaxWidth width="20em">{Story()}</MaxWidth>],
} as ComponentMeta<typeof Tooltip>

export const Default: ComponentStoryObj<typeof Tooltip> = {
  args: {
    text: 'We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld.',
  },
}

export const Multiline: ComponentStoryObj<typeof Tooltip> = {
  args: {
    text: ['Tip!', 'Vul het formulier in en win een parkeervergunning.'],
  },
}
