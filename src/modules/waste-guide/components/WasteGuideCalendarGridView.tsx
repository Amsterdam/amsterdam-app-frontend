import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {FractionCode, WasteGuideResponse} from '@/modules/waste-guide/types'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  wasteGuide: WasteGuideResponse
}

const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const getAllDays = () => {
  const today = dayjs()
  // 1. Days from Monday of this week up to and including today
  const startOfWeek = today.startOf('week').add(0, 'day') // Monday
  const daysBeforeToday: ReturnType<typeof dayjs>[] = []
  let d = startOfWeek.clone()

  while (d.isBefore(today, 'day')) {
    daysBeforeToday.push(d.clone())
    d = d.add(1, 'day')
  }

  // 2. 42 days from today (including today)
  const daysFromToday: ReturnType<typeof dayjs>[] = []

  for (let i = 0; i < 42; i++) {
    daysFromToday.push(today.add(i, 'day'))
  }

  // 3. Pad to Sunday at the end (0 = Sunday)
  const lastDay = daysFromToday[daysFromToday.length - 1]
  const daysAfter = []
  let after = lastDay.clone()

  while (after.day() !== 0) {
    after = after.add(1, 'day')
    daysAfter.push(after.clone())
  }

  // Combine all
  return [...daysBeforeToday, ...daysFromToday, ...daysAfter]
}

export const WasteGuideCalendarGridView = ({wasteGuide}: Props) => {
  const {navigate} = useNavigation()
  const theme = useTheme()
  const styles = createStyles(theme)

  const days = getAllDays()
  // Split days into weeks
  const weeks: ReturnType<typeof dayjs>[][] = []

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // Build a lookup: date string (YYYY-MM-DD) -> array of events
  const eventsByDate: Record<string, FractionCode[]> = {}

  if (wasteGuide.calendar) {
    for (const event of wasteGuide.calendar) {
      const dateStr = event.date

      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = []
      }

      eventsByDate[dateStr].push(event.code)
    }
  }

  return (
    <ScrollView>
      <Column>
        <View style={styles.daysRow}>
          <Row>
            {dayNames.map((name, index) => (
              <View
                key={index}
                style={styles.cell}>
                <Phrase
                  color={
                    name === 'Za' || name === 'Zo' ? 'secondary' : undefined
                  }>
                  {name}
                </Phrase>
              </View>
            ))}
          </Row>
        </View>
        {weeks.map((week, weekIdx) => (
          <View
            key={weekIdx}
            style={styles.daysRow}>
            <Row>
              {week.map((day, dayIdx) => {
                const dateStr = day.format('YYYY-MM-DD')
                const events = eventsByDate[dateStr] || []

                return (
                  <View
                    accessible={!day.isBefore(dayjs(), 'day')}
                    key={dayIdx}
                    style={[
                      styles.cell,
                      day.isBefore(dayjs(), 'day') && styles.dayPast,
                    ]}>
                    <Phrase
                      color={
                        day.day() === 6 || day.day() === 0
                          ? 'secondary'
                          : undefined
                      }>
                      {day.date()}
                    </Phrase>
                    {/* Show all fraction codes for this date */}
                    {events.length > 0 && (
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
                    )}
                  </View>
                )
              })}
            </Row>
          </View>
        ))}
      </Column>
    </ScrollView>
  )
}

const createStyles = ({border, color, size}: Theme) =>
  StyleSheet.create({
    cell: {
      alignItems: 'center',
      height: '100%',
      paddingBottom: size.spacing.lg,
      width: `${100 / 7}%`,
    },
    dayPast: {
      opacity: 0,
    },
    daysRow: {
      borderBottomWidth: border.width.md,
      borderBottomColor: color.box.border.default,
      paddingHorizontal: size.spacing.md,
      marginHorizontal: -size.spacing.md,
    },
  })
