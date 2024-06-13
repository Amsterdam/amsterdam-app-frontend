import {Meta, StoryObj} from '@storybook/react'
import {Tooltip} from './Tooltip'
import {Placement} from '@/components/ui/types'

export default {
  component: Tooltip,
} as Meta<typeof Tooltip>

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    placement: Placement.below,
    text: 'We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld.',
  },
}

export const Multiline: StoryObj<typeof Tooltip> = {
  args: {
    placement: Placement.below,
    text: ['Tip!', 'Vul het formulier in en win een parkeervergunning.'],
  },
}
