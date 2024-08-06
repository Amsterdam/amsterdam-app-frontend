import {View} from 'react-native'
// eslint-disable-next-line no-restricted-imports
import {SimpleGrid as SimpleGridComponent} from 'react-native-super-grid'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'

const style = {backgroundColor: 'transparent'}

export const SimpleGrid: typeof SimpleGridComponent = ({...props}) => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return (
    // This View component is needed to prevent SimpleGrid from blocking the previous element when using Talkback
    <View style={style}>
      <SimpleGridComponent
        {...props}
        maxItemsPerRow={isScreenReaderEnabled ? 1 : props.maxItemsPerRow}
      />
    </View>
  )
}
