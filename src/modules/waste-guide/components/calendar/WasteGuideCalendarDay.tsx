import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  accessibilityLabel?: string
  children: ReactNode
  isAfter?: boolean
  isBeforeToday?: boolean
  isFirstWeekOfMonth?: boolean
  isToday?: boolean
  isWeekDayLabel?: boolean
}

export const WasteGuideCalendarDay = ({
  children,
  isBeforeToday,
  isAfter,
  isToday,
  isFirstWeekOfMonth,
  isWeekDayLabel,
  accessibilityLabel,
}: Props) => {
  const theme = useTheme()
  const styles = createStyles(theme, isWeekDayLabel)

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessible={!isBeforeToday}
      style={[
        styles.cell,
        (isBeforeToday || isAfter) && styles.dayInvisible,
        isToday && styles.cellToday,
        isFirstWeekOfMonth && isToday && styles.cellTodayCurrentWeek,
      ]}>
      {children}
    </View>
  )
}

const createStyles = ({border, color, size}: Theme, isWeekDayLabel?: boolean) =>
  StyleSheet.create({
    cell: {
      alignItems: 'center',
      height: '100%',
      paddingBottom: size.spacing[isWeekDayLabel ? 'md' : 'lg'],
      width: `${100 / 7}%`,
    },
    cellToday: {
      borderWidth: border.width.xl,
      borderColor: color.box.border.emphasis,
    },
    cellTodayCurrentWeek: {
      borderTopWidth: border.width.md,
    },
    dayInvisible: {
      opacity: 0,
    },
  })
