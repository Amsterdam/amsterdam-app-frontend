import {StyleSheet} from 'react-native'
import {Theme} from '@/themes'

export const maxHeight = 1200

export const timelineStyles = (
  theme: Theme,
  fontScale: number,
  isUpcoming: boolean,
  isExpanded: boolean,
  firstItem?: boolean,
  lastItem?: boolean,
) => {
  const {color, size} = theme

  const tokens = {
    body: {
      insetLeft: size.spacing.md,
    },
    indicator: {
      backgroundColor: {
        active: color.background.emphasis,
        inactive: color.background.inactive,
      },
      size: size.spacing.lg * fontScale,
    },
    line: {
      color: color.background.inactive,
      width: 2 * fontScale,
    },
  }

  return StyleSheet.create({
    body: {
      marginLeft: tokens.indicator.size + tokens.body.insetLeft,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    indicator: {
      width: tokens.indicator.size,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: size.spacing.md,
      backgroundColor: isUpcoming
        ? tokens.indicator.backgroundColor.inactive
        : tokens.indicator.backgroundColor.active,
      borderRadius: tokens.indicator.size / 2,
    },
    item: {
      overflow: 'hidden',
    },
    line: {
      position: 'absolute',
      top: firstItem ? size.spacing.md + tokens.indicator.size : 0,
      left: (tokens.indicator.size - tokens.line.width) / 2,
      zIndex: -1,
      width: tokens.line.width,
      height:
        lastItem && !isExpanded
          ? size.spacing.md + tokens.indicator.size
          : '100%',
      backgroundColor: tokens.line.color,
    },
    title: {
      marginLeft: tokens.body.insetLeft,
      marginRight: size.spacing.xs,
      flexShrink: 1,
    },
  })
}
