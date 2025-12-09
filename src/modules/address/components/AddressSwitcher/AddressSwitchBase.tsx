import {View} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {Theme} from '@/themes/themes'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {useThemable} from '@/themes/useThemable'

export type AddressSwitchBaseProps = {
  iconName: Extract<
    SvgIconName,
    'location' | 'housing' | 'spinner' | 'mapLocationIosFilled'
  >
  title: string
} & TestProps

export const AddressSwitchBase = ({
  title,
  iconName,
  testID,
}: AddressSwitchBaseProps) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.container}>
      <TopTaskButton
        iconName={iconName}
        iconRightName={'chevron-right'}
        iconRightSize="md"
        iconSize="lg"
        insetVertical="no"
        testID={testID}
        title={title}
      />
    </View>
  )
}

const createStyles = (theme: Theme) => ({
  container: {
    borderColor: theme.color.addressSwitch.border,
    borderWidth: theme.border.width.md,
  },
})
