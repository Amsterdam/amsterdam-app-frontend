import {ComponentMeta, ComponentStory} from '@storybook/react'
import {SomethingWentWrong} from '@/components/ui/feedback'

export default {
  component: SomethingWentWrong,
} as ComponentMeta<typeof SomethingWentWrong>

export const Default: ComponentStory<typeof SomethingWentWrong> = () => (
  <SomethingWentWrong />
)
