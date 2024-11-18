import {StyleSheet, View} from 'react-native'
import {
  Attachment,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ThumbnailViewer} from '@/modules/chat/components/ThumbnailViewer'

type Props = {
  image: Attachment
  senderRole: ConversationEntrySenderRole
}

const THUMBNAIL_SIZE = 220

export const ChatMessageImage = ({image, senderRole}: Props) => {
  const styles = createStyles(senderRole === ConversationEntrySenderRole.user)

  return (
    <View style={styles.container}>
      <ThumbnailViewer
        fileName={image.name}
        imageSource={{uri: image.url}}
        thumbnailSize={THUMBNAIL_SIZE}
      />
    </View>
  )
}

const createStyles = (isUser: boolean) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderBottomRightRadius: isUser ? 0 : 12,
      borderBottomLeftRadius: isUser ? 12 : 0,
    },
  })
