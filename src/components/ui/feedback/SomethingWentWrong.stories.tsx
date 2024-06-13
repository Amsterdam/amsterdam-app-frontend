import {Meta, StoryFn} from '@storybook/react'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'

export default {
  component: SomethingWentWrong,
} as Meta<typeof SomethingWentWrong>

export const Default: StoryFn<typeof SomethingWentWrong> = () => (
  <SomethingWentWrong />
)
