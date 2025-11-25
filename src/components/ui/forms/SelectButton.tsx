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
  iconRightName?: Extract<SvgIconName, 'chevron-down' | 'chevron-right'>
  onPress: () => void
  text?: string
  textAdditional?: string
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
  textAdditional,
  title,
  error,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityValue,
  iconRightName = 'chevron-down',
}: Props) => (
  <Column gutter="md">
    <TopTaskButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="combobox"
      accessibilityValue={accessibilityValue}
      border
      iconName={iconName}
      iconRightName={iconRightName}
      iconRightSize="lg"
      onPress={onPress}
      testID={testID}
      text={text}
      textAdditional={textAdditional}
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
