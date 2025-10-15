import {AccessibilityProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {BaseAddress, Address} from '@/modules/address/types'

type Props = {
  address: Address | BaseAddress
  label: string
  'logging-label'?: string
  selectResult: (item: Address | BaseAddress) => void
} & Pick<AccessibilityProps, 'accessibilityLabel'> &
  TestProps

// TODO: replace with TopTaskButton
export const SuggestionButton = ({
  label,
  accessibilityLabel,
  address,
  selectResult,
  testID,
  'logging-label': loggingLabel,
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    insetVertical="md"
    logging-label={loggingLabel}
    onPress={() => selectResult(address)}
    testID={testID}>
    <Row gutter="sm">
      <Icon
        color="link"
        logging-label={`${loggingLabel ?? ''}Icon`}
        name="location"
        size="lg"
        testID={`${testID}Icon`}
      />
      <Phrase
        color="link"
        ellipsizeMode="tail"
        logging-label={`${loggingLabel ?? ''}Label`}
        testID={`${testID}Label`}>
        {label}
      </Phrase>
    </Row>
  </Pressable>
)
