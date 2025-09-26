import {Dayjs} from 'dayjs'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

type Props = {
  calendar: WasteGuideCalendarEvent[]
  day: Dayjs
}

export const WasteGuideCalendarDayEvents = ({day, calendar}: Props) => {
  const {navigate} = useNavigation()
  const eventsByDate = getCalendarEventsByDate(calendar)
  const dateStr = day.format('YYYY-MM-DD')
  const events = eventsByDate[dateStr] || []

  if (events?.length === 0) {
    return null
  }

  return (
    <Column gutter="sm">
      {events.map((code, idx) => (
        <IconButton
          accessibilityLabel={`Waste fraction for ${day.format('YYYY-MM-DD')}`}
          icon={<WasteFractionIcon fractionCode={code} />}
          key={idx}
          onPress={() =>
            navigate(WasteGuideRouteName.wasteGuideFraction, {
              fractionCode: code,
            })
          }
          testID="WasteFractionIconCalendarButton"
        />
      ))}
    </Column>
  )
}
