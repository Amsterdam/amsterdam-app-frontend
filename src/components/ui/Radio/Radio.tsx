import {useRadio} from '@react-native-aria/radio'
import React, {useContext, useRef} from 'react'
import {Pressable, PressableProps, StyleSheet} from 'react-native'
import {Center} from '..'
import CircleIcon from '../../../assets/icons/circle.svg'
import {color, size} from '../../../tokens'
import {RadioContext} from '.'

type Props = {
  children: React.ReactNode
  isChecked: boolean
  value: string
}

export const Radio = (props: Props) => {
  const contextState = useContext(RadioContext)
  let inputRef = useRef(null)
  const {inputProps} = useRadio(props, contextState, inputRef)
  const {checked: isChecked} = inputProps

  return (
    <Pressable
      {...(inputProps as PressableProps)}
      accessibilityRole="radio"
      style={styles.button}>
      <Center style={styles.outerCircle}>
        <CircleIcon
          fill={color.background.darker}
          opacity={isChecked ? 1 : 0}
          style={styles.innerCircle}
        />
      </Center>
      {props.children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
  outerCircle: {
    width: 20,
    height: 20,
    marginRight: size.spacing.md,
    borderColor: color.border.input,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  innerCircle: {
    height: 12,
    width: 12,
  },
})
