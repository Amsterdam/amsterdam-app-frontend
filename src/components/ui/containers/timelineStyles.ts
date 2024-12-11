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
  const {color, size, z} = theme
  const backgroundColorUpcoming = color.timeline.primary.upcoming.background
  const backgroundColorDone = color.timeline.primary.done.background

  const tokens = {
    indicator: {
      size: size.spacing.lg * fontScale,
    },
    line: {
      width: 4 * fontScale,
    },
  }

  return StyleSheet.create({
    indicator: {
      flexShrink: 0,
      position: 'relative',
      width: tokens.indicator.size,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: size.spacing.md,
      backgroundColor: isUpcoming
        ? backgroundColorUpcoming
        : backgroundColorDone,
      borderRadius: tokens.indicator.size / 2,
    },
    line: {
      position: 'absolute',
      top: size.spacing.md + tokens.indicator.size,
      left: (tokens.indicator.size - tokens.line.width) / 2,
      zIndex: z.timelineLine,
      width: tokens.line.width,
      height: lastItem && !isExpanded ? 0 : '100%',
      backgroundColor:
        isUpcoming || isBeforeUpcoming
          ? backgroundColorUpcoming
          : backgroundColorDone,
    },
  })
}
