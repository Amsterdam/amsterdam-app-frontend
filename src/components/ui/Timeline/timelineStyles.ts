import {StyleSheet} from 'react-native'
import {color, size} from '../../../tokens'

export const STYLE = {
  CONTENT: {
    INSET_LEFT: size.spacing.md,
    MAX_HEIGHT: 800,
  },
  INDICATOR: {
    BACKGROUND: {
      ACTIVE: color.background.emphasis,
      INACTIVE: color.background.inactive,
    },
    INSET: size.spacing.sm,
    SIZE: size.spacing.lg,
  },
  LINE: {
    COLOR: color.background.inactive,
    WIDTH: 2,
  },
}

export const timelineStyles = (
  isCurrent: boolean,
  firstItem?: boolean,
  lastItem?: boolean,
) => {
  return StyleSheet.create({
    content: {
      marginLeft: STYLE.INDICATOR.SIZE + STYLE.CONTENT.INSET_LEFT,
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: STYLE.INDICATOR.INSET,
    },
    indicator: {
      width: STYLE.INDICATOR.SIZE,
      height: STYLE.INDICATOR.SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isCurrent
        ? STYLE.INDICATOR.BACKGROUND.ACTIVE
        : STYLE.INDICATOR.BACKGROUND.INACTIVE,
      borderRadius: STYLE.INDICATOR.SIZE / 2,
    },
    item: {
      overflow: 'hidden',
    },
    line: {
      position: 'absolute',
      top: firstItem ? STYLE.INDICATOR.INSET : 0,
      left: (STYLE.INDICATOR.SIZE - STYLE.LINE.WIDTH) / 2,
      zIndex: -1,
      width: STYLE.LINE.WIDTH,
      height: lastItem ? STYLE.INDICATOR.INSET : '100%',
      backgroundColor: STYLE.LINE.COLOR,
    },
    title: {
      marginLeft: STYLE.CONTENT.INSET_LEFT,
      marginRight: size.spacing.xs,
    },
  })
}
