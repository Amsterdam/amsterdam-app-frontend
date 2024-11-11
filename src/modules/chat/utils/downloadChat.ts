import {Alert} from 'react-native'
import {retrieveTranscript} from 'react-native-salesforce-messaging-in-app/src'
import {saveFile} from '@/modules/chat/utils/saveFile'
import {devLog} from '@/processes/development'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTime} from '@/utils/datetime/formatDateTime'

export const downloadChat = async () => {
  try {
    const {transcript, entryId} = await retrieveTranscript()

    const fileName = `Chatgeschiedenis ${formatDateTime(dayjs()).replaceAll(':', ' ')}.pdf`
    const mimeType = 'application/pdf'

    await saveFile({base64: {string: transcript, mimeType}, fileName})

    return entryId
  } catch (error) {
    devLog(error)
    Alert.alert('Chat downloaden mislukt.')
  }
}
