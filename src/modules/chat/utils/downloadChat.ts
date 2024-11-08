import {Alert} from 'react-native'
import {retrieveTranscript} from 'react-native-salesforce-messaging-in-app/src'
import {saveFile} from '@/modules/chat/utils/saveFile'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTime} from '@/utils/datetime/formatDateTime'

export const downloadChat = async () => {
  try {
    const fileAsBase64String = await retrieveTranscript()
    const fileName = `Chatgeschiedenis ${formatDateTime(dayjs()).replaceAll(':', ' ')}.pdf`
    const mimeType = 'application/pdf'

    await saveFile({base64: {string: fileAsBase64String, mimeType}, fileName})
  } catch {
    Alert.alert('Chat downloaden mislukt.')
  }
}
