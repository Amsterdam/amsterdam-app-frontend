import {ReactElement} from 'react'
import {ViewProps} from 'react-native'

type IRadioValue = string

type IRadioGroupOnChangeHandler = (value: IRadioValue) => any

export interface IRadioProps extends ViewProps {
  /**
   * The value to be used in the radio input. This is the value that will be returned on form submission
   */
  value: IRadioValue
  /**
   * If true, the radio will be disabled
   */
  isDisabled?: boolean
  /**
   * If true, the radio is marked as invalid. Changes style of unchecked state.
   */
  isInvalid?: boolean
  /**
   * The size (width and height) of the radio.
   */
}

export interface IRadioGroupProps extends ViewProps {
  /**
   * The value of the radio group.
   */
  value?: IRadioValue
  /**
   * The name of the input field in a radio (Useful for form submission).
   */
  name: string
  /**
   * The initial value of the radio group.
   */
  defaultValue?: IRadioValue
  /**
   *
   */
  // TODO: removing
  children: ReactElement<IRadioProps> | ReactElement<IRadioProps>[]
  /**
   * The callback fired when any children radio is checked or unchecked.
   */
  onChange?: IRadioGroupOnChangeHandler
}

export interface RadioGroupState {
  /**
   * The name for the group, used for native form submission.
   * @deprecated
   * @private
   */
  readonly name: string
  /** Whether the radio group is disabled. */
  readonly isDisabled: boolean
  /** Whether the radio group is read only. */
  readonly isReadOnly: boolean
  /** The currently selected value. */
  readonly selectedValue: string | null
  /** The value of the last focused radio. */
  readonly lastFocusedValue: string | null

  /** Sets the selected value. */
  setSelectedValue(value: string): void

  /** Sets the last focused value. */
  setLastFocusedValue(value: string): void
}
