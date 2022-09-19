import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Alert} from '@/components/ui/feedback'

export default {
  component: Alert,
} as ComponentMeta<typeof Alert>

export const Default: ComponentStory<typeof Alert> = () => <Alert />
