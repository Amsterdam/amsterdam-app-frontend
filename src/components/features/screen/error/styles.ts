import {StyleSheet} from 'react-native'
import {Theme} from '@/themes/themes'

export const createStyles =
  ({isPortrait}: {isPortrait: boolean}) =>
  ({media}: Theme) =>
    StyleSheet.create({
      figureBackground: {
        position: 'absolute',
        bottom: '20%',
        width: '100%',
        alignContent: 'flex-start',
        overflow: 'hidden',
      },
      figureForeground: {
        position: 'absolute',
        bottom: isPortrait ? 0 : undefined,
        height: '100%',
        width: '100%',
      },
      facade: {
        aspectRatio: media.illustrationAspectRatio.facades,
        height: media.figureHeight.lg * (3 / 4),
        alignSelf: 'center',
      },
    })
