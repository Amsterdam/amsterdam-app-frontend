import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {CharactersLeftDisplay} from '@/components/ui/forms'

export default {
  component: CharactersLeftDisplay,
} as ComponentMeta<typeof CharactersLeftDisplay>

export const Default: ComponentStoryObj<typeof CharactersLeftDisplay> = {
  args: {
    maxCharacters: 50,
    numOfCharacters: 0,
  },
}
