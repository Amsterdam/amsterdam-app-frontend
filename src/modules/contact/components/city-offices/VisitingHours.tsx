import React, {SVGProps, useState} from 'react'
import {QuestionMarkSolid} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {VisitingHour} from '@/modules/contact/types'
import {getVisitingState} from '@/modules/contact/utils'
import {Theme, useThemable} from '@/themes'
import {accessibleText, dayjs, nonNullable} from '@/utils'

type Props = {
  visitingHours: VisitingHour[]
}

const getVisitingHoursSentence = (visitingHours: VisitingHour[]) => {
  const visitingState = getVisitingState(visitingHours)

  if (visitingState) {
    const {preposition, dayName, time24hr, time12hr} = visitingState

    return {
      full: ['We zijn open', preposition, dayName, time24hr, 'uur.']
        .filter(nonNullable)
        .join(' '),
      compact: ['We zijn open', preposition, dayName, time12hr, 'uur.']
        .filter(nonNullable)
        .join(' '),
    }
  }

  return {full: '', compact: ''}
}

const getTooltipContent = (compact?: boolean) => {
  const formatTime = (time: number) =>
    dayjs()
      .startOf('day')
      .hour(time)
      .format(compact ? 'h:mm' : 'HH.mm')

  // TODO Use dayjs.format here.
  return [
    'De Stadsloketten zijn elke werkdag van',
    formatTime(9),
    'tot',
    formatTime(17),
    'uur open. Op donderdag tot',
    formatTime(20),
    'uur.',
  ].join(' ')
}

export const VisitingHours = ({visitingHours}: Props) => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const iconProps = useThemable(createIconProps)
  const visitingHoursSentence = getVisitingHoursSentence(visitingHours)

  return (
    <Column gutter="md">
      <Row gutter="sm" valign="center">
        {!!visitingHoursSentence.full && (
          <Paragraph accessibilityLabel={visitingHoursSentence.compact}>
            {visitingHoursSentence.full}
          </Paragraph>
        )}
        <IconButton
          accessibilityLabel={accessibleText(getTooltipContent(true))}
          accessibilityRole="none"
          icon={
            <Icon size={24}>
              <QuestionMarkSolid {...iconProps} />
            </Icon>
          }
          onPress={() => setTooltipIsVisible(!tooltipIsVisible)}
        />
      </Row>
      {!!tooltipIsVisible && (
        <Box insetHorizontal="lg">
          <Tooltip placement={Placement.below} text={getTooltipContent()} />
        </Box>
      )}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
