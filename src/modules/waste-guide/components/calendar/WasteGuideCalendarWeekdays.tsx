import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'
import {getWeekdaysStartingFrom} from '@/utils/datetime/getWeekdaysStartingFrom'
import {capitalizeString} from '@/utils/transform/capitalizeString'

const dayNames = getWeekdaysStartingFrom(1, true)
const dayNamesLong = getWeekdaysStartingFrom(1, false)

export const WasteGuideCalendarWeekdays = () => (
  <WasteGuideCalendarDaysRow insetHorizontal="md">
    {dayNames.map((name, index) => (
      <WasteGuideCalendarDay
        accessibilityLabel={dayNamesLong[index]}
        isWeekDayLabel
        key={index}>
        <Phrase
          accessible={false}
          color={
            index === dayNames.length - 1 || index === dayNames.length - 2
              ? 'secondary'
              : undefined
          }>
          {capitalizeString(name)}
        </Phrase>
      </WasteGuideCalendarDay>
    ))}
  </WasteGuideCalendarDaysRow>
)
