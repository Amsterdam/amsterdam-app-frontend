import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  isAfter?: boolean
  isBeforeToday?: boolean
  isFirstWeekOfMonth?: boolean
  isToday?: boolean
}

export const WasteGuideCalendarDay = ({
  children,
  isBeforeToday,
  isAfter,
  isToday,
  isFirstWeekOfMonth,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View
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

const createStyles = ({border, color, size}: Theme) =>
  StyleSheet.create({
    cell: {
      alignItems: 'center',
      height: '100%',
      paddingBottom: size.spacing.lg,
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
