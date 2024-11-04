import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {Column} from '@/components/ui/layout/Column'
import {ChatMenuItem} from '@/modules/chat/components/ChatMenuItem'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  close: () => void
  headerHeight: number
}

export const ChatMenu = ({headerHeight, close}: Props) => {
  const theme = useTheme()
  const sheetStyles = createStyles(theme, headerHeight)

  return (
    <Animated.View
      entering={FadeIn.duration(theme.duration.transition.short)}
      exiting={FadeOut.duration(theme.duration.transition.short)}
      style={sheetStyles.container}>
      <Column halign="start">
        <ChatMenuItem
          color="link"
          label="Chat downloaden"
          onPress={() => {
            close()
            void downloadChat()
          }}
          testID="ChatMenuPressableDownloadChat"
        />
        <ChatMenuItem
          color="warning"
          label="Chat stoppen"
          onPress={close}
          testID="ChatMenuPressableStopChat"
        />
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
