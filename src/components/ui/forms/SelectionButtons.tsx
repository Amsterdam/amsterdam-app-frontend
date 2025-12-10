import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'

type SelectionButton = {
  label: string
}

export type SelectionButtonProps = {
  errorMessage?: string
  label?: string
  onPress: (option: string) => void
  selected: string
  selectionButtons: SelectionButton[]
} & TestProps

export const SelectionButtons = ({
  selectionButtons = [],
  label,
  selected,
  errorMessage,
  testID,
  onPress,
  ...rest
}: SelectionButtonProps) => (
  <Column gutter="md">
    {!!label && <Label text={label} />}
    <Row
      gutter="smd"
      wrap>
      {selectionButtons.map(({label: buttonLabel}, index) => (
        <Button
          accessibilityHint={`Selecteer de optie: ${buttonLabel}`}
          accessibilityLanguage="nl-NL"
          accessibilityRole="radiogroup"
          accessibilityState={{selected: selected === buttonLabel}}
          label={buttonLabel}
          onPress={() => onPress(buttonLabel)}
          testID={`SelectionButtons${index}Button`}
          variant={selected === buttonLabel ? 'primary' : 'secondary'}
          {...rest}
        />
      ))}
    </Row>
    {!!errorMessage && (
      <ErrorMessage
        testID={`${testID}ErrorMessage`}
        text={errorMessage}
      />
    )}
  </Column>
)
