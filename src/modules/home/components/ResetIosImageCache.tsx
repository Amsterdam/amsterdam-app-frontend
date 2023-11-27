import {useCallback} from 'react'
import FastImage from 'react-native-fast-image'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {devLog} from '@/processes/development'

export const ResetIosImageCache = () => (
  <Box>
    <Button
      label="Clear iOS image cache"
      onPress={useCallback(() => {
        void FastImage.clearDiskCache().then(() => devLog('clearDiskCache'))
        void FastImage.clearMemoryCache().then(() => devLog('clearMemoryCache'))
      }, [])}
    />
  </Box>
)
