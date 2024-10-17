import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import {useCallback} from 'react'
import {Alert, StyleSheet} from 'react-native'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {sendImage, sendPDF} from 'react-native-salesforce-messaging-in-app/src'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {usePermission} from '@/hooks/permissions/usePermission'
import {ChatAttachmentButton} from '@/modules/chat/components/ChatAttachmentButton'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {Permissions} from '@/types/permissions'

type Props = {
  minHeight?: number
  onSelect: () => void
}

const fileName = 'ChatAttachment.tsx'

export const ChatAttachment = ({onSelect, minHeight}: Props) => {
  const styles = useThemable(createStyles)

  const trackException = useTrackException()

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = usePermission(Permissions.camera)

  const addPhotoFromLibrary = useCallback(() => {
    void ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(
      result => {
        if (result.assets?.[0].uri) {
          const file = result.assets?.[0]

          sendImage(file.base64!, file.fileName ?? 'image.png').then(
            onSelect,
            error => {
              Alert.alert(
                'Sorry, opsturen van de afbeelding is mislukt. Probeer het later nog eens.',
              )

              trackException(
                ExceptionLogKey.chatSendImageFromLibrary,
                fileName,
                {
                  error,
                },
              )
            },
          )
        }
      },
      error => {
        Alert.alert(
          'Sorry, kiezen van een afbeelding is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatPickImageFromLibrary, fileName, {
          error,
        })
      },
    )
  }, [onSelect, trackException])

  const addPhotoFromCamera = useCallback(async () => {
    if (!hasCameraPermission) {
      await requestCameraPermission()
    }

    void ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(
      result => {
        if (result.assets?.[0].uri) {
          const file = result.assets?.[0]

          sendImage(file.base64!, file.fileName ?? 'image.png').then(
            onSelect,
            error => {
              Alert.alert(
                'Sorry, opsturen van de afbeelding is mislukt. Probeer het later nog eens.',
              )

              trackException(
                ExceptionLogKey.chatSendImageFromCamera,
                fileName,
                {
                  error,
                },
              )
            },
          )
        }
      },
      error => {
        Alert.alert(
          'Sorry, maken van een foto is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatTakeImageWithCamera, fileName, {
          error,
        })
      },
    )
  }, [hasCameraPermission, requestCameraPermission, onSelect, trackException])
  const addPDF = useCallback(() => {
    void DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    }).then(
      result => {
        if (result.assets?.[0].uri) {
          sendPDF(result.assets?.[0].uri).then(onSelect, error => {
            Alert.alert(
              'Sorry, opsturen van het PDF document is mislukt. Probeer het later nog eens.',
            )

            trackException(ExceptionLogKey.chatSendPDF, fileName, {
              error,
            })
          })
        }
      },
      error => {
        Alert.alert(
          'Sorry, kiezen van een PDF document is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatPickPDF, fileName, {
          error,
        })
      },
    )
  }, [onSelect, trackException])

  return (
    <Animated.View
      entering={SlideInDown}
      style={[styles.attachments, {minHeight: Math.round(minHeight ?? 0)}]}>
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
