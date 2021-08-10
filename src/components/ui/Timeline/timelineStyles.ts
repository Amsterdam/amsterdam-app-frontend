import {StyleSheet} from 'react-native'
import {color, size} from '../../../tokens'

export const STYLE = {
  CONTENT: {
    MAX_HEIGHT: 800,
    ANIMATION: {
      DURATION: 500,
    },
  },
  INDICATOR: {
    SPACE_AROUND: {
      TOP: size.spacing.sm,
      BOTTOM: size.spacing.sm,
    },
    SIZE: {
      HEIGHT: size.spacing.lg,
      WIDTH: size.spacing.lg,
    },
    BACKGROUND: {
      ACTIVE: color.background.emphasis,
      INACTIVE: color.background.inactive,
    },
  },
  LINE: {
    COLOR: color.background.inactive,
    WIDTH: 2,
  },
  SECTION: {
    BACKGROUND: {
      ACTIVE: color.background.light,
    },
  },
  SPACE_BEFORE: size.spacing.md,
}

export const timelineStyles = (
  isCurrent: boolean,
  expanded: boolean,
  firstItem: boolean | undefined,
  lastItem: boolean | undefined,
) => {
  return StyleSheet.create({
    content: {
      marginLeft: STYLE.INDICATOR.SIZE.WIDTH + STYLE.SPACE_BEFORE,
    },
    indicator: {
      width: STYLE.INDICATOR.SIZE.WIDTH,
      height: STYLE.INDICATOR.SIZE.HEIGHT,
      backgroundColor: isCurrent
        ? STYLE.INDICATOR.BACKGROUND.ACTIVE
        : STYLE.INDICATOR.BACKGROUND.INACTIVE,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    line: {
      position: 'absolute',
      top: firstItem ? STYLE.INDICATOR.SPACE_AROUND.TOP : 0,
      left: STYLE.INDICATOR.SIZE.WIDTH / 2 - STYLE.LINE.WIDTH / 2,
      width: STYLE.LINE.WIDTH,
      height: lastItem ? STYLE.INDICATOR.SPACE_AROUND.TOP : '200%',
      backgroundColor: STYLE.LINE.COLOR,
      zIndex: -1,
    },
    section: {
      paddingVertical: STYLE.INDICATOR.SPACE_AROUND.TOP,
      overflow: 'hidden',
    },
    title: {
      marginLeft: size.spacing.md,
      marginRight: size.spacing.xs,
    },
  })
}
