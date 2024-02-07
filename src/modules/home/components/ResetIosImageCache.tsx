import {useCallback} from 'react'
import {Platform} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {devLog, isDevApp} from '@/processes/development'

export const ResetIosImageCache = () => {
  const onPress = useCallback(() => {
    void FastImage.clearDiskCache().then(() => devLog('clearDiskCache'))
    void FastImage.clearMemoryCache().then(() => devLog('clearMemoryCache'))
  }, [])

  if (!isDevApp || Platform.OS === 'android') {
    return
  }

  return (
    <Box>
      <Button
        label="Clear iOS image cache"
        onPress={onPress}
      />
    </Box>
  )
}
