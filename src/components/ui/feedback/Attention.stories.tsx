import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Attention} from '@/components/ui/feedback/Attention'
import {Paragraph} from '@/components/ui/text/Paragraph'

export default {
  component: Attention,
} as ComponentMeta<typeof Attention>

export const Default: ComponentStoryObj<typeof Attention> = {
  args: {
    children: (
      <Paragraph>
        Er is iets misgegaan met de app. Sorry voor het ongemak!
      </Paragraph>
    ),
    warning: false,
  },
}
