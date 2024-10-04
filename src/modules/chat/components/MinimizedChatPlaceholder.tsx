import {Platform, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useChat} from '@/modules/chat/slice'
import {ChatVisibility} from '@/modules/chat/types'

export const MinimizedChatPlaceholder = () => {
  const insets = useSafeAreaInsets()
  const {minimizedHeight, visibility: chatVisibility} = useChat()
  const height =
    Platform.OS === 'android' ? minimizedHeight + insets.top : minimizedHeight
  const styles = createStyles(height)

  return chatVisibility === ChatVisibility.minimized ? (
    <View style={styles.container} />
  ) : null
}

const createStyles = (height: number) =>
  StyleSheet.create({
    container: {
      height,
      backgroundColor: 'red',
      width: '100%',
    },
  })
