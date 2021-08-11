import {StyleSheet} from 'react-native'
import {color, size} from '../../../tokens'

export const STYLE = {
  CONTENT: {
    INSET_LEFT: size.spacing.md,
    MAX_HEIGHT: 800,
  },
  INDICATOR: {
    INSET: size.spacing.sm,
    SIZE: size.spacing.lg,
    BACKGROUND: {
      ACTIVE: color.background.emphasis,
      INACTIVE: color.background.inactive,
    },
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
    indicator: {
      width: STYLE.INDICATOR.SIZE,
      height: STYLE.INDICATOR.SIZE,
      backgroundColor: isCurrent
        ? STYLE.INDICATOR.BACKGROUND.ACTIVE
        : STYLE.INDICATOR.BACKGROUND.INACTIVE,
      borderRadius: STYLE.INDICATOR.SIZE / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: STYLE.INDICATOR.INSET,
    },
    line: {
      position: 'absolute',
      top: firstItem ? STYLE.INDICATOR.INSET : 0,
      left: (STYLE.INDICATOR.SIZE - STYLE.LINE.WIDTH) / 2,
      width: STYLE.LINE.WIDTH,
      height: lastItem ? STYLE.INDICATOR.INSET : '100%',
      backgroundColor: STYLE.LINE.COLOR,
      zIndex: -1,
    },
    item: {
      overflow: 'hidden',
    },
    title: {
      marginLeft: STYLE.CONTENT.INSET_LEFT,
      marginRight: size.spacing.xs,
    },
  })
}
