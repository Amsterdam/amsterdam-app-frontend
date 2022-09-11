import React, {SVGProps} from 'react'
import {Clock, PersonalLogin} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

export const WaitingTime = () => {
  const iconProps = useThemable(createIconProps)

  return (
    <Box>
      <Column gutter="md">
        <Row gutter="md">
          <Icon size={32}>
            <Clock {...iconProps} />
          </Icon>
          <Paragraph>Actuele wachttijd: 5 minuten</Paragraph>
        </Row>
        <Row gutter="md">
          <Icon size={32}>
            <PersonalLogin {...iconProps} />
          </Icon>
          <Paragraph>Momenteel 3 wachtenden</Paragraph>
        </Row>
      </Column>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.default,
})
