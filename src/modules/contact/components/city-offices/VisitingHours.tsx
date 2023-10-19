import {useRef} from 'react'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Tooltip} from '@/components/ui/feedback/Tooltip'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Placement} from '@/components/ui/types'
import {CityOffice, VisitingHour} from '@/modules/contact/types'
import {getVisitingState} from '@/modules/contact/utils/getVisitingState'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {dayjs} from '@/utils/datetime/dayjs'
import {nonNullable} from '@/utils/nonNullable'

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
  const visitingHoursSentence = getVisitingHoursSentence(visitingHours)

  const tooltipRef = useRef<Tooltip>(null)

  if (visitingHoursContent) {
    return <HtmlContent content={visitingHoursContent} />
  }

  return (
    <Column gutter="md">
      <Row
        gutter="sm"
        valign="center">
        {!!visitingHoursSentence.written && (
          <Paragraph
            accessibilityLabel={visitingHoursSentence.spoken}
            testID="ContactVisitingHoursParagraph">
            {visitingHoursSentence.written}
          </Paragraph>
        )}
        <IconButton
          accessibilityLabel={`${
            tooltipRef.current?.isOpen ? 'Verberg' : 'Bekijk'
          } uitleg`}
          icon={
            <Icon
              color="link"
              name="question-mark-solid"
              size="lg"
            />
          }
          onPress={() => {
            tooltipRef.current?.onToggle()
          }}
          testID="ContactVisitingHoursTooltipButton"
        />
      </Row>
      <Tooltip
        accessibilityLabel={accessibleText(getTooltipContent('spoken'))}
        placement={Placement.below}
        ref={tooltipRef}
        text={getTooltipContent('written')}
      />
    </Column>
  )
}
