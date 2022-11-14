import {StyleSheet} from 'react-native'
import {Theme} from '@/themes'

export const maxHeight = 1200

export const timelineStyles = (
  theme: Theme,
  isCurrent: boolean,
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
      inset: size.spacing.sm,
      size: size.spacing.lg,
    },
    line: {
      color: color.background.inactive,
      width: 2,
    },
  }
  const spaceBetweenIndicators =
    tokens.indicator.inset + tokens.indicator.size / 2

  return StyleSheet.create({
    body: {
      marginLeft: tokens.indicator.size + tokens.body.insetLeft,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: tokens.indicator.inset,
    },
    indicator: {
      width: tokens.indicator.size,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isCurrent
        ? tokens.indicator.backgroundColor.active
        : tokens.indicator.backgroundColor.inactive,
      borderRadius: tokens.indicator.size / 2,
    },
    item: {
      overflow: 'hidden',
    },
    line: {
      position: 'absolute',
      top: firstItem ? spaceBetweenIndicators : 0,
      left: (tokens.indicator.size - tokens.line.width) / 2,
      zIndex: -1,
      width: tokens.line.width,
      height: lastItem ? spaceBetweenIndicators : '100%',
      backgroundColor: tokens.line.color,
    },
    title: {
      marginLeft: tokens.body.insetLeft,
      marginRight: size.spacing.xs,
      flexShrink: 1,
    },
  })
}
