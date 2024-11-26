import {StyleSheet, View} from 'react-native'
import {
  Attachment,
  ConversationEntry,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {ThumbnailViewer} from '@/modules/chat/components/ThumbnailViewer'

type Props = {
  image: Attachment
  message: ConversationEntry
}

const THUMBNAIL_SIZE = 220

export const ChatMessageImage = ({
  image,
  message: {sender, senderDisplayName},
}: Props) => {
  const isUser = sender.role === ConversationEntrySenderRole.user
  const styles = createStyles(isUser)

  return (
    <View style={styles.container}>
      <ThumbnailViewer
        accessibilityLabel={`Miniatuurweergave van ${isUser ? 'door u gedeelde afbeelding.' : ''} ${!isUser ? 'door ' + senderDisplayName + 'gedeelde afbeelding.' : ''}`}
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
