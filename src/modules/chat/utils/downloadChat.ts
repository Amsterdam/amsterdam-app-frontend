import {
  StorageAccessFramework,
  writeAsStringAsync,
  EncodingType,
  documentDirectory,
} from 'expo-file-system'
import {shareAsync} from 'expo-sharing'
import {Platform, Alert} from 'react-native'
import {retrieveTranscript} from 'react-native-salesforce-messaging-in-app/src'
import {devLog} from '@/processes/development'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTime} from '@/utils/datetime/formatDateTime'

export const downloadChat = async () => {
  try {
    const result = await retrieveTranscript()
    const fileName = `Chatgeschiedenis ${formatDateTime(dayjs()).replaceAll(':', ' ')}.pdf`
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
}
