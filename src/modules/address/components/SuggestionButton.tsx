import {AccessibilityProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {PdokAddress} from '@/modules/address/types'

type Props = {
  label: string
  pdokAddress: PdokAddress
  selectResult: (item: PdokAddress) => void
  'sentry-label'?: string
} & Pick<AccessibilityProps, 'accessibilityLabel'> &
  TestProps

// TODO: replace with TopTaskButton
export const SuggestionButton = ({
  label,
  accessibilityLabel,
  pdokAddress,
  selectResult,
  testID,
  'sentry-label': sentryLabel,
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    insetVertical="md"
    onPress={() => selectResult(pdokAddress)}
    sentry-label={sentryLabel}
    testID={testID}>
    <Row
      gutter="sm"
      valign="center">
      <Icon
        color="link"
        name="location"
        sentry-label={`${sentryLabel ?? ''}Icon`}
        size="lg"
        testID={testID ? `${testID}Icon` : undefined}
      />
      <Phrase
        color="link"
        ellipsizeMode="tail"
        sentry-label={`${sentryLabel ?? ''}Label`}
        testID={testID ? `${testID}Label` : undefined}>
        {label}
      </Phrase>
    </Row>
  </Pressable>
)
