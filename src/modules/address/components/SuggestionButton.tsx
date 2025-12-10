import {AccessibilityProps} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {BaseAddress, Address} from '@/modules/address/types'

type Props = {
  address: Address | BaseAddress
  iconName?: SvgIconName
  label: string
  'logging-label'?: string
  onPress: (address: Address | BaseAddress) => void
} & Pick<AccessibilityProps, 'accessibilityLabel'> &
  TestProps

export const SuggestionButton = ({
  iconName = 'location',
  label,
  address,
  onPress,
  testID,
  accessibilityLabel,
  'logging-label': loggingLabel,
}: Props) => (
  <TopTaskButton
    accessibilityHint="Tik om dit adres te selecteren"
    accessibilityLabel={accessibilityLabel}
    accessibilityLanguage="nl-NL"
    accessibilityRole="button"
    iconName={iconName}
    iconSize="lg"
    insetHorizontal="sm"
    logging-label={loggingLabel}
    logName="SuggestionButton"
    onPress={() => onPress(address)}
    rowGutter="sm"
    testID={testID}
    title={label}
    titleColor="default"
    titleEmphasized={false}
  />
)
