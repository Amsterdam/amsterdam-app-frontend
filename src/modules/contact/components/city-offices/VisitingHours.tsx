import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {CityOffice, ExceptionDate, VisitingHour} from '@/modules/contact/types'
import {getVisitingState} from '@/modules/contact/utils/getVisitingState'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {dayjs} from '@/utils/datetime/dayjs'
import {nonNullable} from '@/utils/nonNullable'

type Props = {
  visitingHours: VisitingHour[]
  visitingHoursContent: CityOffice['visitingHoursContent']
  visitingHoursExceptions: ExceptionDate[]
}

const getVisitingHoursSentence = (
  visitingHours: VisitingHour[],
  exceptionDates: ExceptionDate[],
) => {
  const visitingState = getVisitingState(visitingHours, exceptionDates)

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

const getOpeningHoursMore = (form: 'spoken' | 'written') => {
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

export const VisitingHours = ({
  visitingHours,
  visitingHoursContent,
  visitingHoursExceptions,
}: Props) => {
  const visitingHoursSentence = getVisitingHoursSentence(
    visitingHours,
    visitingHoursExceptions,
  )

  if (visitingHoursContent) {
    return (
      <HtmlContent
        content={visitingHoursContent}
        testID="ContactVisitingHoursHtml"
      />
    )
  }

  return (
    <Column gutter="sm">
      {!!visitingHoursSentence.written && (
        <Paragraph
          accessibilityLabel={visitingHoursSentence.spoken}
          testID="ContactVisitingHoursParagraphOpeningTimes">
          {visitingHoursSentence.written}
        </Paragraph>
      )}
      <Paragraph
        accessibilityLabel={accessibleText(getOpeningHoursMore('spoken'))}
        testID="ContactVisitingHoursParagraphOpeningTimesMore">
        {getOpeningHoursMore('written')}
      </Paragraph>
    </Column>
  )
}
