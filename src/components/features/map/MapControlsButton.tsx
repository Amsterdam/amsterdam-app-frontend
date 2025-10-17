import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLabel: string
  iconName: SvgIconName
  onPress: () => void
} & TestProps

export const MapControlsButton = ({
  accessibilityLabel,
  iconName,
  onPress,
  testID,
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    onPress={onPress}
    testID={testID}>
    <Box
      borderColor="distinct"
      borderWidth="md"
      inset="sm">
      <Icon
        color="link"
        name={iconName}
        size="lg"
      />
    </Box>
  </Pressable>
)
