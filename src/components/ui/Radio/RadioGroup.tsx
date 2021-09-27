import {useRadioGroup} from '@react-native-aria/radio'
import {useRadioGroupState} from '@react-stately/radio'
import React from 'react'
import {Box} from '../'
import {IRadioGroupProps, RadioGroupState} from '../../../types/radio'

export const RadioContext = React.createContext({} as RadioGroupState)

export const RadioGroup = (props: IRadioGroupProps) => {
  const state = useRadioGroupState(props)
  const {radioGroupProps} = useRadioGroup(
    {...props, 'aria-label': props.accessibilityLabel},
    state,
  )

  //TODO remove this
  console.log(radioGroupProps)

  return (
    <Box {...radioGroupProps}>
      <RadioContext.Provider value={{...state}}>
        {props.children}
      </RadioContext.Provider>
    </Box>
  )
}
