import {Meta, StoryObj} from '@storybook/react'
import {CharactersLeftDisplay} from '@/components/ui/forms/CharactersLeftDisplay'

export default {
  component: CharactersLeftDisplay,
} as Meta<typeof CharactersLeftDisplay>

export const Default: StoryObj<typeof CharactersLeftDisplay> = {
  args: {
    maxCharacters: 50,
    numOfCharacters: 0,
  },
}
