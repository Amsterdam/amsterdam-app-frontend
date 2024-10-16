import * as DocumentPicker from 'expo-document-picker'
import {StyleSheet} from 'react-native'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {sendPDF} from 'react-native-salesforce-messaging-in-app/src'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {ChatAttachmentButton} from '@/modules/chat/components/ChatAttachmentButton'
import {devError} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onSelect: () => void
}

export const ChatAttachment = ({onSelect}: Props) => {
  const styles = useThemable(createStyles)

  const a = () => {
    void DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    }).then(result => {
      if (result.assets?.[0].uri) {
        sendPDF(result.assets?.[0].uri).then(onSelect, error => {
          devError('failed to upload PDF', error)
          // TODO: log error and notify user
        })
      }
    })
  }

  return (
    <Animated.View
      entering={SlideInDown}
      style={styles.attachments}>
      <Box>
        <Row
          align="evenly"
          gutter="sm">
          <ChatAttachmentButton
            iconName="document-text"
            label="Foto"
            onPress={a}
            testID="pdf"
          />
          <ChatAttachmentButton
            iconName="document-text"
            label="Camera"
            onPress={a}
            testID="pdf"
          />
          <ChatAttachmentButton
            iconName="document-text"
            label="PDF"
            onPress={a}
            testID="pdf"
          />
        </Row>
      </Box>
    </Animated.View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    attachments: {
      backgroundColor: color.chat.attachment.background,
    },
  })
