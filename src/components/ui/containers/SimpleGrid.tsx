// eslint-disable-next-line no-restricted-imports
import {SimpleGrid as SimpleGridComponent} from 'react-native-super-grid'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'

export const SimpleGrid: typeof SimpleGridComponent = ({...props}) => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return (
    <SimpleGridComponent
      {...props}
      maxItemsPerRow={isScreenReaderEnabled ? 1 : props.maxItemsPerRow}
    />
  )
}
