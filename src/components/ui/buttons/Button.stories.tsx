import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import React from 'react'
import {Button} from './Button'
import {Row} from '@/components/ui/layout'

export default {
  component: Button,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof Button>

export const Primary: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Label',
    variant: 'primary',
  },
}

export const Secondary: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Label',
    variant: 'secondary',
  },
}

export const Tertiary: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Label',
    variant: 'tertiary',
  },
}

export const _Inline: ComponentStory<typeof Button & typeof Row> = ({
  align,
}) => (
  <Row align={align}>
    <Button label="Inline button" />
  </Row>
)

_Inline.args = {
  align: 'start',
}

export const __Alignment: ComponentStory<typeof Button & typeof Row> = ({
  align,
  gutter,
}) => (
  <Row align={align} gutter={gutter}>
    <Button label="First button" />
    <Button label="Second button" variant="secondary" />
    <Button label="Third button" variant="tertiary" />
  </Row>
)

__Alignment.args = {
  align: 'start',
  gutter: 'md',
}

export const __WithIcon: ComponentStory<typeof Button & typeof Row> = ({
  align,
}) => (
  <Row align={align}>
    <Button icon={Phone} label="Bel ons" />
  </Row>
)

__WithIcon.args = {
  align: 'start',
}
