import React, {useState} from 'react'
import {IconButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Article, Paragraph} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {CityOffice, VisitingHour} from '@/modules/contact/types'
import {getVisitingState} from '@/modules/contact/utils'
import {accessibleText, dayjs, nonNullable} from '@/utils'

type Props = {
  visitingHours: VisitingHour[]
  visitingHoursContent: CityOffice['visitingHoursContent']
}

const getVisitingHoursSentence = (visitingHours: VisitingHour[]) => {
  const visitingState = getVisitingState(visitingHours)

  if (visitingState) {
    const {dayName, preposition, time24hr, time12hr} = visitingState

    const sentence = (form: 'spoken' | 'written') =>
      [
        'We zijn open',
        preposition,
        dayName,
        form === 'written' ? time24hr : time12hr,
        'uur.',
      ]
        .filter(nonNullable)
        .join(' ')

    return {
      spoken: sentence('spoken'),
      written: sentence('written'),
    }
  }

  return {spoken: '', written: ''}
}

const getTooltipContent = (form: 'spoken' | 'written') => {
  const formatTime = (time: number) =>
    dayjs()
      .startOf('day')
      .hour(time)
      .format(form === 'spoken' ? 'h:mm' : 'HH.mm')

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

export const VisitingHours = ({visitingHours, visitingHoursContent}: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const visitingHoursSentence = getVisitingHoursSentence(visitingHours)

  if (visitingHoursContent) {
    return <Article content={visitingHoursContent} />
  }

  return (
    <Column gutter="md">
      <Row gutter="sm" valign="center">
        {!!visitingHoursSentence.written && (
          <Paragraph accessibilityLabel={visitingHoursSentence.spoken}>
            {visitingHoursSentence.written}
          </Paragraph>
        )}
        <IconButton
          icon={<Icon color="link" name="question-mark-solid" size={24} />}
          accessibilityLabel={`${
            isTooltipVisible ? 'Verberg' : 'Bekijk'
          } uitleg`}
          onPress={() => setIsTooltipVisible(!isTooltipVisible)}
        />
      </Row>
      {!!isTooltipVisible && (
        <Box insetHorizontal="lg">
          <Tooltip
            accessibilityLabel={accessibleText(getTooltipContent('spoken'))}
            placement={Placement.below}
            text={getTooltipContent('written')}
          />
        </Box>
      )}
    </Column>
  )
}
