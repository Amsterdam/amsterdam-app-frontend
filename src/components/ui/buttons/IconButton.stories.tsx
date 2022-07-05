import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {Meta, Story} from '@storybook/react'
import React from 'react'
import {IconButton, IconButtonProps} from './IconButton'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export default {
  component: IconButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta

const Template: Story<IconButtonProps> = args => {
  const iconProps = useThemable(createIconProps)

  const PersonalLoginIcon = (
    <Icon size={24}>
      <PersonalLogin {...iconProps} />
    </Icon>
  )

  return (
    <Row align="start">
      <IconButton {...args} icon={PersonalLoginIcon} />
    </Row>
  )
}

export const Default = Template.bind({})
Default.args = {
  badgeValue: 7,
}

const createIconProps = ({color}: Theme) => ({
  fill: color.pressable.default.background,
})
