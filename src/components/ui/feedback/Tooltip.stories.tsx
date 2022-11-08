import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Tooltip} from './Tooltip'
import {Placement} from '@/components/ui/types'

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

export const Default: ComponentStoryObj<typeof Tooltip> = {
  args: {
    placement: Placement.below,
    text: 'We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld.',
  },
}

export const Multiline: ComponentStoryObj<typeof Tooltip> = {
  args: {
    placement: Placement.below,
    text: ['Tip!', 'Vul het formulier in en win een parkeervergunning.'],
  },
}
