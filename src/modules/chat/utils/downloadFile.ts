import * as FileSystem from 'expo-file-system'

export const downloadFile = async (downloadUri: string, filename: string) => {
  const {headers, uri} = await FileSystem.downloadAsync(
    downloadUri,
    FileSystem.documentDirectory + filename,
  )

  return {uri, mimeType: headers['content-type']}
}
