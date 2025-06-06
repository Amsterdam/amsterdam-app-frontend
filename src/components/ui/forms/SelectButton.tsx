import {FieldError} from 'react-hook-form'
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
} & TestProps

export const SelectButton = ({
  iconName,
  testID,
  text,
  title,
  error,
  onPress,
}: Props) => (
  <Column gutter="md">
    <TopTaskButton
      border
      iconName={iconName}
      iconRightName="chevron-down"
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
