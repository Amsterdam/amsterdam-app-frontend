import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import type {SpacingTokens} from '@/themes/tokens/size'
import {Row} from '@/components/ui/layout/Row'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  insetHorizontal?: keyof SpacingTokens
  isFirstOfMonth?: boolean
  isLastOfMonth?: boolean
}

export const WasteGuideCalendarDaysRow = ({
  children,
  insetHorizontal,
  isFirstOfMonth,
  isLastOfMonth,
}: Props) => {
  const styles = useThemable(theme => createStyles(theme, insetHorizontal))

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

const createStyles = (
  {border, color, size}: Theme,
  insetHorizontal: keyof SpacingTokens = 'no',
) =>
  StyleSheet.create({
    daysRow: {
      borderBottomWidth: border.width.md,
      borderBottomColor: color.box.border.default,
      paddingHorizontal: size.spacing[insetHorizontal],
    },
    daysRowMonthFirst: {
      borderTopWidth: border.width.md,
      borderTopColor: color.box.border.emphasis,
    },
    daysRowMonthLast: {
      borderBottomWidth: 0,
    },
  })
