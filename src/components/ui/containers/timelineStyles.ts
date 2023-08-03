import {StyleSheet} from 'react-native'
import {Theme} from '@/themes/themes'

export const maxHeight = 1200

export const timelineStyles = (
  theme: Theme,
  fontScale: number,
  isBeforeUpcoming: boolean,
  isUpcoming: boolean,
  isExpanded: boolean,
  lastItem: boolean,
) => {
  const {color, size} = theme

  const tokens = {
    body: {
      insetLeft: size.spacing.md,
    },
    indicator: {
      size: size.spacing.lg * fontScale,
    },
    line: {
      width: 4 * fontScale,
    },
  }

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    indicator: {
      position: 'relative',
      width: tokens.indicator.size,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: size.spacing.md,
      backgroundColor: isUpcoming
        ? color.background.inactive
        : color.background.emphasis,
      borderRadius: tokens.indicator.size / 2,
    },
    line: {
      position: 'absolute',
      top: size.spacing.md + tokens.indicator.size,
      left: (tokens.indicator.size - tokens.line.width) / 2,
      zIndex: -1,
      width: tokens.line.width,
      height: lastItem && !isExpanded ? 0 : '100%',
      backgroundColor:
        isUpcoming || isBeforeUpcoming
          ? color.background.inactive
          : color.background.emphasis,
    },
  })
}
