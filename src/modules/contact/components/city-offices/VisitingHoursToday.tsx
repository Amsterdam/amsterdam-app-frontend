import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {ExceptionDate, VisitingHour} from '@/modules/contact/types'
import {getVisitingHoursTodayStatus} from '@/modules/contact/utils/getVisitingHoursTodayStatus'

type Props = {
  visitingHours: VisitingHour[]
  visitingHoursExceptions: ExceptionDate[]
}

export const VisitingHoursToday = ({
  visitingHours,
  visitingHoursExceptions,
}: Props) => {
  const status = getVisitingHoursTodayStatus(
    visitingHours,
    visitingHoursExceptions,
  )

  if (status.label === 'open-exception') {
    return (
      <Column>
        <Phrase
          color="confirm"
          emphasis="strong"
          testID="ContactVisitingHoursTodayOpenLabel">
          Open tot {status.closingTime} uur
        </Phrase>
        <Paragraph>(aangepaste openingstijden)</Paragraph>
      </Column>
    )
  }

  if (status.label === 'closed') {
    return (
      <Phrase
        color="warning"
        emphasis="strong"
        testID="ContactVisitingHoursTodayClosedLabel">
        Gesloten
      </Phrase>
    )
  }

  // If open due to regular hours, show nothing (or add a label if desired)
  return null
}
