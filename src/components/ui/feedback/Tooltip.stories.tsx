import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {Tooltip} from './Tooltip'
import {Canvas} from '@/../.storybook/components'

export default {
  component: Tooltip,
  decorators: [Story => <Canvas maxWidth="20em">{Story()}</Canvas>],
} as ComponentMeta<typeof Tooltip>

export const Default: ComponentStoryObj<typeof Tooltip> = {
  args: {
    placement: 'bottom',
    text: 'We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld.',
  },
}

export const Multiline: ComponentStoryObj<typeof Tooltip> = {
  args: {
    placement: 'bottom',
    text: ['Tip!', 'Vul het formulier in en win een parkeervergunning.'],
  },
}
