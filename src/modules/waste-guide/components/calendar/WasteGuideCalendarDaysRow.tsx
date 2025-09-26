import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  isFirstOfMonth?: boolean
  isLastOfMonth?: boolean
}

export const WasteGuideCalendarDaysRow = ({
  children,
  isFirstOfMonth,
  isLastOfMonth,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View
      style={[
        styles.daysRow,
        isFirstOfMonth && styles.daysRowMonthFirst,
        isLastOfMonth && styles.daysRowMonthLast,
      ]}>
      <Row>{children}</Row>
    </View>
  )
}

const createStyles = ({border, color, size}: Theme) =>
  StyleSheet.create({
    daysRow: {
      borderBottomWidth: border.width.md,
      borderBottomColor: color.box.border.default,
      paddingHorizontal: size.spacing.md,
      marginHorizontal: -size.spacing.md,
    },
    daysRowMonthFirst: {
      borderTopWidth: border.width.md,
      borderTopColor: color.box.border.emphasis,
    },
    daysRowMonthLast: {
      borderBottomWidth: 0,
    },
  })
