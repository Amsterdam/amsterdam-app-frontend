import {FieldError} from 'react-hook-form'
import {AccessibilityProps} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {TestProps} from '@/components/ui/types'

type Props = {
  error?: FieldError
  iconName: SvgIconName
  onPress: () => void
  text?: string
  title: string
} & TestProps &
  Pick<
    AccessibilityProps,
    'accessibilityLabel' | 'accessibilityHint' | 'accessibilityValue'
  >

export const SelectButton = ({
  iconName,
  testID,
  text,
  title,
  error,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityValue,
}: Props) => (
  <Column gutter="md">
    <TopTaskButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="combobox"
      accessibilityValue={accessibilityValue}
      border
      iconName={iconName}
      iconRightName="chevron-down"
      iconRightSize="lg"
      onPress={onPress}
      testID={testID}
      text={text}
      title={title}
    />
    {!!error && (
      <ErrorMessage
        testID={`${testID}ErrorText`}
        text={error.message ?? ''}
      />
    )}
  </Column>
)
