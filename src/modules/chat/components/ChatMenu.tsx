import {
  StorageAccessFramework,
  writeAsStringAsync,
  EncodingType,
  documentDirectory,
} from 'expo-file-system'
import {shareAsync} from 'expo-sharing'
import {Alert, Platform, StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {retrieveTranscript} from 'react-native-salesforce-messaging-in-app/src'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {devLog} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTime} from '@/utils/datetime/formatDateTime'

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
        <Pressable
          onPress={async () => {
            try {
              close()
              const result = await retrieveTranscript()
              const fileName = `Chatgeschiedenis ${formatDateTime(dayjs())}.pdf`
              const mimeType = 'application/pdf'
              let uri: string | undefined

              if (Platform.OS === 'android') {
                const permissions =
                  await StorageAccessFramework.requestDirectoryPermissionsAsync()

                if (permissions.granted) {
                  uri = await StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    fileName,
                    mimeType,
                  ).then(
                    async safUri => {
                      await writeAsStringAsync(safUri, result, {
                        encoding: EncodingType.Base64,
                      })

                      return safUri
                    },
                    () => undefined,
                  )
                }
              }

              if (!uri) {
                uri = `${documentDirectory}${fileName}`
                await writeAsStringAsync(uri, result, {
                  encoding: EncodingType.Base64,
                })
                void shareAsync(uri, {
                  mimeType,
                  UTI: 'com.adobe.pdf',
                })
              }

              devLog('saved to file', uri)
            } catch (error) {
              Alert.alert('Chat downloaden mislukt')
            }
          }}
          testID="ChatMenuPressableDownloadChat">
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
        <Pressable
          onPress={() => {
            close()
          }}
          testID="ChatMenuPressableStopChat">
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
