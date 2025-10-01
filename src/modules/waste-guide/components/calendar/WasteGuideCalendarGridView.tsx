import {View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDayEvents} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDayEvents'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'
import {WasteGuideCalendarMonthTitle} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarMonthTitle'
import {WasteGuideCalendarWeekdays} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeekdays'
import {getCalendarWeeks} from '@/modules/waste-guide/components/calendar/utils/getCalendarWeeks'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  calendar: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarGridView = ({calendar}: Props) => {
  const weeks = getCalendarWeeks()

  return (
    <Box>
      <WasteGuideCalendarWeekdays />
      <ScrollView>
        <Box insetTop="md">
          {weeks.map((week, weekIdx) => (
            <View key={weekIdx}>
              <WasteGuideCalendarMonthTitle
                isFirstOfMonth={week.isFirstOfMonth}
                monthName={week.monthName}
              />
              <WasteGuideCalendarDaysRow
                isFirstOfMonth={week.isFirstOfMonth}
                isLastOfMonth={week.isLastOfMonth}>
                {week.days.map((day, dayIdx) => {
                  const isToday = day.isSame(dayjs(), 'day')
                  const isBeforeToday = day.isBefore(dayjs(), 'day')
                  const isAfterPeriod = day
                    .add(1, 'day')
                    .isAfter(dayjs().add(6, 'week'), 'day')
                  const isWeekendDay = day.day() === 6 || day.day() === 0

                  return (
                    <WasteGuideCalendarDay
                      isAfter={isAfterPeriod}
                      isBeforeToday={isBeforeToday}
                      isFirstWeekOfMonth={week.isFirstOfMonth}
                      isToday={isToday}
                      key={dayIdx}>
                      <Phrase
                        color={isWeekendDay ? 'secondary' : undefined}
                        emphasis={isToday ? 'strong' : undefined}>
                        {day.date()}
                      </Phrase>
                      <WasteGuideCalendarDayEvents
                        calendar={calendar}
                        day={day}
                      />
                    </WasteGuideCalendarDay>
                  )
                })}
              </WasteGuideCalendarDaysRow>
            </View>
          ))}
        </Box>
      </ScrollView>
    </Box>
  )
}
