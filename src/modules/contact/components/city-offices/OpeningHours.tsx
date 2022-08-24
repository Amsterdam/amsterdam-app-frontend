import React, {SVGProps, useState} from 'react'
import {Question} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

const copy = {
  paragraph: {
    text: 'We zijn geopend tot 17.00 uur.',
    accessibilityLabel: 'We zijn geopend tot 5 uur.',
  },
  tooltip: {
    text: 'De Stadsloketten zijn elke werkdag van 09.00 tot 17.00 uur open. Op donderdag tot 20.00 uur.',
    accessibilityLabel:
      'De Stadsloketten zijn elke werkdag van 9 tot 5 uur open. Op donderdag tot 8 uur.',
  },
}

export const OpeningHours = () => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const iconProps = useThemable(createIconProps)
  const {paragraph, tooltip} = copy

  return (
    <Column gutter="md">
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={paragraph.accessibilityLabel}>
          {paragraph.text}
        </Paragraph>
        <IconButton
          accessibilityLabel={accessibleText(tooltip.accessibilityLabel)}
          accessibilityRole="none"
          icon={
            <Icon size={24}>
              <Question {...iconProps} />
            </Icon>
          }
          onPress={() => setTooltipIsVisible(!tooltipIsVisible)}
        />
      </Row>
      {!!tooltipIsVisible && (
        <Box insetHorizontal="lg">
          <Tooltip placement={Placement.below} text={tooltip.text} />
        </Box>
      )}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
