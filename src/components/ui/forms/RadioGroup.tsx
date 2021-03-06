import {useRadioGroup} from '@react-native-aria/radio'
import {useRadioGroupState} from '@react-stately/radio'
import React, {createContext} from 'react'
import {View} from 'react-native'
import {IRadioGroupProps, RadioGroupState} from '../../../types/radio'
import {Label} from '../Label'
import {Gutter} from '../layout'

export const RadioContext = createContext({} as RadioGroupState)

export const RadioGroup = (props: IRadioGroupProps) => {
  const state = useRadioGroupState(props)
  const {radioGroupProps} = useRadioGroup(
    {...props, 'aria-label': props.accessibilityLabel},
    state,
  )

  return (
    <View {...radioGroupProps}>
      {props.accessibilityLabel ? (
        <>
          <Label isAccessible={false} text={props.accessibilityLabel} />
          <Gutter height="sm" />
        </>
      ) : null}
      <RadioContext.Provider value={{...state}}>
        {props.children}
      </RadioContext.Provider>
    </View>
  )
}
