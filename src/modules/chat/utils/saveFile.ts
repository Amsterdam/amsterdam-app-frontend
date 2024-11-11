import {
  documentDirectory,
  EncodingType,
  StorageAccessFramework,
  writeAsStringAsync,
} from 'expo-file-system'
import {shareAsync} from 'expo-sharing'
import {Platform} from 'react-native'
import {contentTypeToUTI} from '@/modules/chat/utils/contentTypeToUTI'
import {downloadFile} from '@/modules/chat/utils/downloadFile'
import {devLog} from '@/processes/development'

type Params = {
  base64?: {
    mimeType: string
    string: string
  }
  downloadUri?: string
  fileName: string
}

/**
 *
 * @param downloadUri Optional. http:// or https://
 * @param fileName example.pdf
 * @param base64 Optional. Object containing string and mimeType
 * @param base64.string The base64 encoded string of the file content
 * @param base64.mimeType The MIME type of the file
 *
 */
export const saveFile = async ({base64, downloadUri, fileName}: Params) => {
  try {
    if (downloadUri) {
      const {mimeType, uri} = await downloadFile(downloadUri, fileName)

      const contentsAsBase64 = await readContentsAsBase64(uri)

      await saveFileOnDevice(contentsAsBase64, fileName, mimeType)
    } else if (base64) {
      await saveFileOnDevice(base64.string, fileName, base64.mimeType)
    } else {
      throw 'Give either base64 or downloadUri as an argument to saveFile.'
    }
  } catch (error) {
    devLog(error)

    throw error
  }
}

const requestDirectoryPermission = async (): Promise<string> => {
  try {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (permissions.granted) {
      return permissions.directoryUri
    } else {
      throw 'Not granted directory permission.'
    }
  } catch {
    throw 'Requesting directory permission failed.'
  }
}

const createEmptyFile = async (
  directoryUri: string,
  fileName: string,
  mimeType: string,
): Promise<string> => {
  try {
    return await StorageAccessFramework.createFileAsync(
      directoryUri,
      fileName,
      mimeType,
    )
  } catch {
    throw 'Creating empty file failed.'
  }
}

const readContentsAsBase64 = async (uri: string): Promise<string> => {
  try {
    return await StorageAccessFramework.readAsStringAsync(uri, {
      encoding: EncodingType.Base64,
    })
  } catch {
    throw 'Reading file as base64 string failed.'
  }
}

const writeFileContentsAsBase64String = async (
  safUri: string,
  base64: string,
) => {
  try {
    await StorageAccessFramework.writeAsStringAsync(safUri, base64, {
      encoding: EncodingType.Base64,
    })
    devLog(`saved to file ${safUri}`)
  } catch {
    throw 'Writing base64 string to file failed.'
  }
}

const shareFile = async (
  base64: string,
  fileName: string,
  mimeType: string,
) => {
  const fileUri = `${documentDirectory}${fileName}`

  try {
    await writeAsStringAsync(fileUri, base64, {
      encoding: EncodingType.Base64,
    })
    await shareAsync(fileUri, {
      mimeType,
      UTI: contentTypeToUTI[mimeType],
    })
    devLog(`saved to file ${fileUri}`)
  } catch {
    throw 'Failed to share file with other applications.'
  }
}

const saveOnAndroid = async (
  base64: string,
  fileName: string,
  mimeType: string,
) => {
  try {
    const directoryUri = await requestDirectoryPermission()
    const safUri = await createEmptyFile(directoryUri, fileName, mimeType)

    await writeFileContentsAsBase64String(safUri, base64)
  } catch (error) {
    await shareFile(base64, fileName, mimeType)
    throw error
  }
}

const saveFileOnDevice = async (
  base64: string,
  fileName: string,
  mimeType: string,
) => {
  if (Platform.OS === 'android') {
    await saveOnAndroid(base64, fileName, mimeType)
  } else {
    await shareFile(base64, fileName, mimeType)
  }
}
