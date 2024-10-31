import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  headerHeight: number
}

export const ChatMenu = ({headerHeight}: Props) => {
  const theme = useTheme()
  const sheetStyles = createStyles(theme, headerHeight)

  return (
    <Animated.View
      entering={FadeIn.duration(theme.duration.transition.short)}
      exiting={FadeOut.duration(theme.duration.transition.short)}
      style={sheetStyles.container}>
      <Column halign="start">
        <Pressable testID="ChatMenuPressableDownloadChat">
          <Box
            insetHorizontal="md"
            insetVertical="sm">
            <Phrase
              color="link"
              testID="ChatMenuPressableDownloadChatPhrase">
              Chat downloaden
            </Phrase>
          </Box>
        </Pressable>
        <Pressable testID="ChatMenuPressableStopChat">
          <Box
            insetHorizontal="md"
            insetVertical="sm">
            <Phrase
              color="warning"
              testID="ChatMenuPressableStopChatPhrase">
              Chat stoppen
            </Phrase>
          </Box>
        </Pressable>
      </Column>
    </Animated.View>
  )
}

const createStyles = ({color, z, size}: Theme, headerHeight: number) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: size.spacing.sm,
      top: headerHeight,
      backgroundColor: color.box.distinct,
      zIndex: z.tooltip,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })
