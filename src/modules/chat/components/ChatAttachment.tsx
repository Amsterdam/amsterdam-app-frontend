import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import {useCallback} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {sendImage, sendPDF} from 'react-native-salesforce-messaging-in-app/src'
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

  const addPhotoFromLibrary = useCallback(() => {
    void ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(result => {
      if (result.assets?.[0].uri) {
        const file = result.assets?.[0]

        sendImage(file.base64!, file.fileName ?? 'image.png').then(
          onSelect,
          error => {
            devError('failed to upload Image', error)
            // TODO: log error and notify user
          },
        )
      }
    })
  }, [onSelect])

  const addPhotoFromCamera = useCallback(() => {
    void ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(result => {
      if (result.assets?.[0].uri) {
        const file = result.assets?.[0]

        sendImage(file.base64!, file.fileName ?? 'image.png').then(
          onSelect,
          error => {
            devError('failed to upload Image', error)
            // TODO: log error and notify user
          },
        )
      }
    })
  }, [onSelect])
  const addPDF = useCallback(() => {
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
  }, [onSelect])

  return (
    <Animated.View
      entering={SlideInDown}
      style={styles.attachments}>
      <Box>
        <Row
          align="evenly"
          gutter="sm">
          <ChatAttachmentButton
            iconName="picture"
            label="Foto"
            onPress={addPhotoFromLibrary}
            testID="pdf"
          />
          <ChatAttachmentButton
            iconName="camera"
            label="Camera"
            onPress={addPhotoFromCamera}
            testID="pdf"
          />
          <ChatAttachmentButton
            iconName="document"
            label="PDF"
            onPress={addPDF}
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
